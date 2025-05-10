function Section({children, className, onClick}){
    return(
        <div className={className} onClick={onClick}>{children}</div>
    )
}
export default Section;