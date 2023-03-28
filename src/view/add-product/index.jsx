import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import * as Routes from "../../router"
import { Link, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import '../edit-user/edit-user.scss'
import '../edit-product/edit-product.scss'
import './add-product.scss'
import { addProductAdminAction } from '../../actions/adminActions';
import { ADMIN_ADD_PRODUCT_CLEAR } from '../../constants/adminConstants';
import { storage } from '../../config/firebase';

export default function AddProduct() {

  const [isPending, setIsPending] = useState(false)
  const [isBlur, setIsBlur] = useState(false)
  const {user} = useSelector(state => state.userLogIn)
  const {isLoading, isSuccess} = useSelector(state => state.adminAddProduct)
  const [image, setImage] = useState('sample.png')
  const [errMsg, setErrMsg] = useState('')
  const [frmData, setFrmData] = useState({
    name: '',
    price: 0,
    brand: '',
    stock:0,
    category: '',
    detail: ''
  })

  const dispatch= useDispatch()
  const history= useHistory()

  const onChange= (e) =>{
    setFrmData((prev) =>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const {name, price, brand, stock, category, detail} = frmData

  const handleChange= async (e) =>{
    const image= e.target.files[0]
    if(!image){
      setErrMsg('Please input the image...!')
      return
    }
    if(!image.type.startsWith("image")){
      setErrMsg('Image only...!')
      return
    }
    if(image.size > 1000000){
      setErrMsg('Image size is too large...!')
      return
    }
    
    // const imagePath= storage.ref(`/images/${image.name}`)
    // await imagePath.put(image)
    // const getUrl= await imagePath.getDownloadURL()
    
    const uploadTask = storage.ref(`/images/${image.name}-${Date.now()}-${Math.random()}`).put(image)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      setIsPending(true)
      setIsBlur(true)
    }, (err) => {
      //catches the errors
      setIsPending(false)
      setIsBlur(true)
      setErrMsg(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(`${image.name}`).getDownloadURL()
       .then(fireBaseUrl => {
        setIsPending(false)
        setIsBlur(false)
        setErrMsg('')
        setImage(prevObject => ({...prevObject, imgUrl: `${fireBaseUrl}`}))
       })
    })
  }
  
  const handleSubmit= async (e) =>{
    e.preventDefault()

    const data={
      user: user && user.uid,
      name,
      image: image.imgUrl,
      brand,
      category,
      description: detail,
      price: Number(price),
      stock: Number(stock)
    }
    dispatch(addProductAdminAction(data))
  }
  
  useEffect(() => {
    if(isSuccess){
      history.push(Routes.ADMIN_PRODUCT)
    }
   
    return () => {
      dispatch({type: ADMIN_ADD_PRODUCT_CLEAR })
    }
  }, [isSuccess, history, dispatch])

  return (
    <>
      <NavBar />
        <div className="maximum-width-page">
          <div className='link-back'>
            <Link to={Routes.ADMIN_PRODUCT}>
              <span>Go back</span>
            </Link>
          </div>
          <div className="form-update-info">
            <div className="title-overview">
              <span>Add Product</span>
            </div>
            {errMsg && (
              <div className="box-err-message">
                <span>{errMsg}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" name="name" id="name" value={name} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Price</label>
              </div>
              <div>
                <input type="number" name="price" id="price"  value={price} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Image</label>
              </div>
              <div>
                <input type="hidden" value={image.imgUrl ? image.imgUrl : image} onChange={(e) => {setImage(e.target.value)}} className='width100' required />
                <input type="file" onChange={handleChange} required className='width100'/>
                {isPending && <div className="is-uploading"><span>Uploading...</span></div>}
              </div>
              <div>
                <label>Brand</label>
              </div>
              <div>
                <input type="text" name="brand" id="brand" value={brand} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Count In Stock</label>
              </div>
              <div>
                <input type="number" name="stock" id="stock" value={stock} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Category</label>
              </div>
              <div>
                <input type="text" name="category" id="category" value={category} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Description</label>
              </div>
              <div>
                <input type="text" name="detail" id="detail" value={detail} onChange={onChange} className='width100' required />
              </div>
              {isLoading && <button className="mrg-10">Submiting...</button>}
              {!isLoading && <button className={`mrg-10 ${isBlur ? 'blur' : ''}`}>Submit</button>}
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
}
