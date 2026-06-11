import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadDocument } from '../services/api';
import styles from './UploadModal.module.css';

export default function UploadModal({ onClose, onSuccess }) {
  const [file,     setFile]     = useState(null);
  const [progress, setProgress] = useState(0);  // 0-100
  const [status,   setStatus]   = useState('idle'); // idle | uploading | done | error
  const [error,    setError]    = useState('');

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) { setFile(accepted[0]); setStatus('idle'); setError(''); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100 MB
  });

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    setProgress(0);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await uploadDocument(formData, {
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      setStatus('done');
      setTimeout(() => onSuccess(data), 800);
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button className={styles.tabActive}>Upload Files</button>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className={styles.limit}>Max file size: 100 MB at a time</p>

        {/* Drop zone */}
        <div
          {...getRootProps()}
          className={`${styles.dropzone} ${isDragActive ? styles.dragActive : ''}`}
        >
          <input {...getInputProps()} />
          <Upload size={24} className={styles.uploadIcon} />
          <p className={styles.dropText}>Drop files here</p>
          <p className={styles.orText}>— or —</p>
          <button type="button" className={styles.browseBtn}>Browse on your device</button>
        </div>

        {/* Selected file */}
        {file && (
          <div className={styles.filePreview}>
            <div className={styles.fileMeta}>
              <FileText size={16} />
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>

            {status === 'uploading' && (
              <div className={styles.progressWrap}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <span className={styles.progressLabel}>Uploading {progress}%</span>
              </div>
            )}

            {status === 'done' && (
              <div className={styles.successRow}>
                <CheckCircle size={16} color="var(--accent)" />
                <span>Upload complete!</span>
              </div>
            )}

            {status === 'error' && (
              <div className={styles.errorRow}>
                <AlertCircle size={16} color="var(--danger)" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Supported formats */}
        <details className={styles.formats}>
          <summary>Supported formats</summary>
          <p>PDF (.pdf) — up to 100 MB per file</p>
        </details>

        {/* Footer actions */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button
            className={styles.uploadBtn}
            onClick={handleUpload}
            disabled={!file || status === 'uploading' || status === 'done'}
          >
            {status === 'uploading' ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
