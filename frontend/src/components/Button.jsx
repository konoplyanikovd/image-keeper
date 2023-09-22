const Button = ({imgSrc, click, text, isLoading }) => (
    <button className='flex flex-row items-center p-15p bg-gray-200 rounded-10p cursor-pointer' onClick={click} disabled={isLoading}>
        {imgSrc ? <img src={imgSrc} className={`${isLoading?'filter-gray-500':''} w-6 h-6`}/> : ''}
        <span className={`ml-2.5 color-${isLoading?'gray-5':'purple-8'}00 font-inter font-normal text-sm leading-tight tracking-tighter mr-1.5`}>{ text }</span>
    </button>
);
export default Button;