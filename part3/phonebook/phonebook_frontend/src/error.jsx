function Error({name,errorStatus}){
    if(name){
        if(errorStatus){
            return(
                <>
                <div className="noerror">
                    {name} added successfully
                </div>
                </>
            )
        }
        else{
            return(
                <>
                <div className="error">
                    {name} has aldredy been removed from the server

                </div>
                </>
            )
        }

    
    
}
else{
    return(
        <>
        
        </>
    )

}

}

export default Error


