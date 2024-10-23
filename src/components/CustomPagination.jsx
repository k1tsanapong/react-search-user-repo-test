function CustomPagination({ totalPages, page, onChange }) {

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);  


    return (  
        <ButtonGroup variant="outlined" aria-label="Basic button group">  
          {pageNumbers.map((number) => {  
            const buttonColor = number === page ? "primary" : "inherit";  
            return (  
              <Button  
                key={number}  
                onClick={() => onChange(number)}  
                color={buttonColor}  
              >  
                {number}  
              </Button>  
            );  
          })}  
        </ButtonGroup>  
      );  
    
}

export default CustomPagination;