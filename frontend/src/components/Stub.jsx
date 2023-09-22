import '../styles/Stub.css';

export default (props) => <div style={ { width: props.width + 'px', height: props.height + 'px' } } className={ `${props.type || 'default'} rounded-10p bg-gray-100 stub-pulse` } />