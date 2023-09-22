const Modal = ({ children }) => (
    <div className="flex h-screen z-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex-col justify-center items-center">{children}</div>
);
export default Modal;