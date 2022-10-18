import React,{useContext} from 'react';
import CatagoryContext from '../../Contexts/CatagoryContext';

      


const Catagory = () => {

  const {catagory,dispatchCatagory} = useContext(CatagoryContext);
  

  return (
    <div className="post_catagories">
            <div className="catagory_header">
                <p>Catagory</p>
            </div>

            <div className="all catagory catagory_body">
                <a href = "#">All Catagory</a>
            </div>
        
          {
              catagory.map((data,index) =>{
                  return(
                    <div key={index} className="catagory_body">
                        <a href="#" className="catagory_links">
                           {data.catagory_name}
                        </a>
                    </div>
                  )

            })
          }
           
        </div>
  )
}

export default Catagory