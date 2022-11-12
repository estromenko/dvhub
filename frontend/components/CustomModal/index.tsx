import "./styles.scss";

import { FC, PropsWithChildren } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
};

const CustomModal: FC<PropsWithChildren<Properties>> = ({
  children,
  isOpen,
  setIsOpen,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={() => setIsOpen(false)}
    overlayClassName="modal-overlay"
    className="modal"
    closeTimeoutMS={500}
  >
    {children}
  </ReactModal>
);

export default CustomModal;
