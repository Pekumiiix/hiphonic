import { useCallback, useState } from 'react';
import {
  type DropEvent,
  type DropzoneOptions,
  type FileRejection,
  useDropzone,
} from 'react-dropzone';

interface UseFileUploadProps extends DropzoneOptions {
  onFilesChange?: (files: File[]) => void;
}

export function useFileUpload({ onFilesChange, ...dropzoneOptions }: UseFileUploadProps = {}) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setFiles((prev) => {
        const newFiles = [...prev, ...acceptedFiles];
        onFilesChange?.(newFiles);
        return newFiles;
      });

      if (dropzoneOptions.onDrop) {
        dropzoneOptions.onDrop(acceptedFiles, fileRejections, {} as DropEvent);
      }
    },
    [dropzoneOptions, onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } = useDropzone({
    ...dropzoneOptions,
    onDrop,
  });

  const removeFile = useCallback(
    (fileToRemove: File) => {
      setFiles((prev) => {
        const newFiles = prev.filter((file) => file !== fileToRemove);
        onFilesChange?.(newFiles);
        return newFiles;
      });
    },
    [onFilesChange],
  );

  const state = {
    files,
    isDragging: isDragActive,
    errors: fileRejections,
  };

  const actions = {
    removeFile,
    openFileDialog: open,
    getInputProps,
    getRootProps,
  };

  return [state, actions] as const;
}
