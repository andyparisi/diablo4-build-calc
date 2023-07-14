import { FC, MouseEvent, ReactNode, createRef, useCallback, useEffect } from 'react';
import styles from './Dialog.module.sass';

interface DialogProps {
  open?: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog: FC<DialogProps> = ({ open = false, onClose, children }) => {
  const dialogRef = createRef<HTMLDialogElement>();
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDialogElement>) => {
      const dialogDimensions = e.currentTarget.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      dialogRef?.current?.showModal();
    } else {
      dialogRef?.current?.close();
    }
  }, [open, dialogRef]);

  return (
    <dialog ref={dialogRef} className={styles.Dialog} onClick={handleClick}>
      {children}
    </dialog>
  );
};

export default Dialog;
