import cart from './cart.jpg';
import dropdown from './dropdown.png';
import exchange from './exchange.jpg';
import kid11 from './kid11.jpg';
import kid12 from './kid12.jpg';
import kid13 from './kid13.jpg';
import kid14 from './kid14.jpg';
import kid21 from './kid21.jpg';
import kid41 from './kid41.jpg';
import kid42 from './kid42.jpg';
import kid43 from './kid43.jpg';
import kid51 from './kid51.jpg';
import kid52 from './kid52.jpg';
import kid53 from './kid53.jpg';
import logo from './logo.jpg';
import men11 from './men11.jpg';
import men12 from './men12.jpg';
import men21 from './men21.jpg';
import men22 from './men22.jpg';
import men23 from './men23.jpg';
import men31 from './men31.jpg';
import men32 from './men32.jpg';
import men41 from './men41.jpg';
import men42 from './men42.jpg';
import men51 from './men51.jpg';
import men52 from './men52.jpg';
import men61 from './men61.jpg';
import men62 from './men62.jpg';
import men71 from './men71.jpg';
import men72 from './men72.jpg';
import men73 from './men73.jpg';
import men81 from './men81.jpg';
import men82 from './men82.jpg';
import women121 from './women121.jpg';
import women92 from './women92.jpg';
import women1 from './women1.jpg';
import women101 from './women101.jpeg';
import women102 from './women102.jpg';
import women103 from './women103.jpg';
import women111 from './women111.jpg';
import women112 from './women112.jpg';
import women122 from './women122.jpg';
import women2 from './women2.jpg';
import women31 from './women31.jpg';
import women41 from './women41.jpg';
import women42 from './women42.jpg';
import women51 from './women51.jpg';
import women52 from './women52.jpg';
import women61 from './women61.jpg';
import women62 from './women62.jpg';
import women71 from './women71.jpg';
import women73 from './women73.jpg';
import women74 from './women74.jpg';
import women81 from './women81.jpg';
import women82 from './women82.jpg';
import women91 from './women91.jpg';
import searchicon from './searchicon.png';
import returnIcon from './return.png';
import support from './customersupport.png';
import crossicon from './crossicon.png';
import stripe_logo from './stripelogo.jpg';
import razorpay_logo from './razorpaylogo.jpg';
import contact from './contact.jpg';
export const assets = {
  crossicon,
  stripe_logo,
  razorpay_logo,
  contact,
  cart,
  dropdown,
  exchange,
  kid11,
  kid12,
  kid13,
  kid14,
  kid21,
  kid41,
  kid42,
  kid43,
  kid51,
  kid52,
  kid53,
  logo,
  men11,
  men12,
  men21,
  men22,
  men23,
  men31,
  men32,
  men41,
  men42,
  men51,
  men52,
  men61,
  men62,
  men71,
  men72,
  men73,
  men81,
  men82,
  women121,
  women92,
  women1,
  women101,
  women102,
  women103,
  women111,
  women112,
  women122,
  women2,
  women31,
  women41,
  women42,
  women51,
  women52,
  women61,
  women62,
  women71,
  women73,
  women74,
  women81,
  women82,
  women91,
  searchicon,
  support,
  returnIcon
};


export const all_product = [
  { id: 1, name: 'Product 1', category: 'women', subcategory:'dress', image: [women1], new_price: 50.0, old_price: 80.5, size: ['S', 'M', 'L'], bestseller: true},
  { id: 2, name: 'Product 2', category: 'women', subcategory:'dress', image: [women2], new_price: 85.0, old_price: 120.5, size: ['S', 'M', 'L'], bestseller: true},
  { id: 3, name: 'Men 11', category: 'men',subcategory:'hoodies', image: [men11,men12], new_price: 60.0, old_price: 100.5,size: ['S', 'M', 'L','XL','XXL'], bestseller: true },
  { id: 4, name: 'Men 21', category: 'men', subcategory:'hoodies', image: [men21,men22,men23], new_price: 45.0, old_price: 70.0,size: ['S', 'M', 'L','XL'], bestseller: true },
  { id: 5, name: 'Kid 11', category: 'kids',subcategory:'track-suit', image: [kid11,kid12], new_price: 30.0, old_price: 50.0,size:['Xs','S','M'],bestseller: true },
  { id: 6, name: 'Women 31', category: 'women', subcategory:'dress', image: [women31], new_price: 65.0, old_price: 95.0,size: ['S', 'M', 'L'], bestseller: true },
  { id: 7, name: 'Women 41', category: 'women', subcategory:'dress', image: [women41,women42], new_price: 70.0, old_price: 110.0,size: ['S', 'M', 'L'], bestseller: true },
  { id: 8, name: 'Women 51', category: 'women', subcategory:'dress', image: [women51,women52], new_price: 54.0, old_price: 82.0,size: ['S', 'M', 'L'], bestseller: false },
  { id: 13, name: 'Women 61', category: 'women', subcategory:'dress', image: [women61,women62], new_price: 49.0, old_price: 75.0, size: ['S', 'M', 'L'], bestseller: true},
  { id: 15, name: 'Women 71', category: 'women', subcategory:'dress', image: [women71,women74,women73], new_price: 77.0, old_price: 120.0,size: ['S', 'M', 'L'], bestseller: true },
  { id: 18, name: 'Women 81', category: 'women', subcategory:'dress', image: [women81,women82], new_price: 72.0, old_price: 110.0, size: ['S', 'M', 'L'], bestseller: false},
  { id: 20, name: 'Women 91', category: 'women', subcategory:'saree', image: [women91,women92], new_price: 74.0, old_price: 115.0, size: ['freesize'], bestseller: true},

  { id: 25, name: 'Men 31', category: 'men', subcategory:'jeans',image: [men31,men32], new_price: 55.0, old_price: 85.0, size: ['S', 'M', 'L','XL','XXL'], bestseller: true},
  { id: 26, name: 'Men 41', category: 'men', subcategory:'jeans',image: [men41,men42], new_price: 55.0, old_price: 85.0, size: ['S', 'M', 'L','XL','XXL'], bestseller: true},
  { id: 27, name: 'Men 51', category: 'men', subcategory:'shirt',image: [men51,men52], new_price: 55.0, old_price: 85.0, size: ['S', 'M', 'L','XL','XXL'], bestseller: true},
  { id: 28, name: 'Men 61', category: 'men', subcategory:'shirt',image: [men61,men62], new_price: 55.0, old_price: 85.0, size: ['S', 'M', 'L','XL','XXL'], bestseller: true},
  { id: 29, name: 'Men 71', category: 'men', subcategory:'shorts',image: [men71,men72,men73], new_price: 55.0, old_price: 85.0, size: ['S', 'M', 'L','XL','XXL'], bestseller: true},
  { id: 36, name: 'Men 81', category: 'men', subcategory:'shorts', image: [men81,men82], new_price: 66.0, old_price: 96.0 , size: ['S', 'M', 'L','XL','XXL'], bestseller: true},
  { id: 38, name: 'Women121', category: 'women', subcategory: 'dress',image: [women121,women122], new_price: 68.0, old_price: 98.0,size: ['S', 'M', 'L','XL','XXL'], bestseller: true },
  { id: 40, name: 'Kid 13', category: 'kids',subcategory: 'track-suit', image: [kid13,kid14], new_price: 33.0, old_price: 56.0, size: ['XS','S', 'M'], bestseller: false},
  { id: 42, name: 'Kid 21', category: 'kids',subcategory: 'track-suit', image: [kid21], new_price: 35.0, old_price: 58.0, size: ['XS','S', 'M'], bestseller: true},
  { id: 43, name: 'Kid 41', category: 'kids',subcategory: 'track-suit', image: [kid41,kid42,kid43],new_price: 36.0, old_price: 59.0,size: ['XS','S', 'M'], bestseller: true },
  { id: 46, name: 'Kid 51', category: 'kids', subcategory: 'track-suit',image: [kid51,kid52,kid53], new_price: 39.0, old_price: 62.0,size: ['XS','S', 'M'], bestseller: true },
  { id: 49, name: 'Women 101', category: 'women', subcategory: 'track-suit',image: [women101,women103,women103], new_price: 75.0, old_price: 120.0,size: ['XS','S', 'M','L'], bestseller: true },
  { id: 52, name: 'Women 111', category: 'women', subcategory: 'track-suit',image: [women111,women112], new_price: 78.0, old_price: 123.0,size: ['XS','S', 'M','L'], bestseller: true },
];
export default all_product;
