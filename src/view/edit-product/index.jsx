import React, {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import * as Routes from "../../router"
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../edit-user/edit-user.scss'
import './edit-product.scss'
import { editProductAdminAction, getProductDetailAdmin } from '../../actions/adminActions';
import { ADMIN_EDIT_PRODUCT_CLEAR } from '../../constants/adminConstants';
import { storage } from '../../config/firebase';

export default function EditProduct() {

  const [isPending, setIsPending] = useState(false)
  const [isBlur, setIsBlur] = useState(false)
  const {user} = useSelector(state => state.userLogIn)
  const {product} = useSelector(state => state.adminGetProductDetail)
  const {isLoading, isSuccess}= useSelector(state => state.adminEditProduct)
  const dispatch= useDispatch()
  const {id}= useParams()
  const history= useHistory()
  const [name, setName]= useState('')
  const [price, setPrice]= useState(0)
  const [brand, setBrand]= useState('')
  const [stock, setStock]= useState(0)
  const [category, setCategory]= useState('')
  const [detail, setDetail]=useState('')
  const [image, setImage]= useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() =>{

    if(!product || Object.keys(product).length===0){
      dispatch(getProductDetailAdmin(id))
    }else{
      setName(product.name)
      setPrice(product.price)
      setBrand(product.brand)
      setStock(product.stock)
      setCategory(product.category)
      setDetail(product.description)
      setImage(product.image)
    }
    
    if(isSuccess){
      history.push(Routes.ADMIN_PRODUCT)
      dispatch({ type: ADMIN_EDIT_PRODUCT_CLEAR })
    }
    
  }, [dispatch, product, id, isSuccess, history])

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
      storage.ref('images').child(image.name).getDownloadURL()
       .then(fireBaseUrl => {
        setIsPending(false)
        setIsBlur(false)
        setErrMsg('')
        setImage(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const value={
      name,
      image: image.imgUrl ? image.imgUrl : image,
      brand,
      category,
      description: detail,
      price,
      stock
    }
    dispatch(editProductAdminAction(id, value))
  }

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
              <span>Edit Product</span>
            </div>
            {errMsg && (
              <div className="box-err-message">
                <span>{errMsg}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Price</label>
              </div>
              <div>
                <input type="number" value={price} onChange={(e) => {setPrice(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Image</label>
              </div>
              <div>
                <input type="hidden" className="width100" value={image.imgUrl ? image.imgUrl : image} onChange={(e) => {setImage(e.target.value)}} required />
                <input type="file" onChange={handleChange} className="width100" />
                {isPending && <div className="is-uploading"><span>Uploading...</span></div>}
              </div>
              <div>
                <label>Brand</label>
              </div>
              <div>
                <input type="text" value={brand} onChange={(e) => {setBrand(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Count In Stock</label>
              </div>
              <div>
                <input type="number" value={stock} onChange={(e) => {setStock(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Category</label>
              </div>
              <div>
                <input type="text"  value={category} onChange={(e) => {setCategory(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Description</label>
              </div>
              <div>
                <input type="text" value={detail} onChange={(e) => {setDetail(e.target.value)}}  className="width100" required />
              </div>
              {isLoading && <button className="mrg-10">Updating...</button>}
              {!isLoading && <button className={`mrg-10 ${isBlur ? 'blur' : ''}`}>Update</button>}
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
}
