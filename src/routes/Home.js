/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import { dbService } from '../fbase';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';


const Home = () => {
  const [upload, setUpload] = useState("");
  const [contents, setContents] = useState([]);
  const nweetCollectionRef = collection(dbService, "nweets");

  useEffect(() => {
    // getDocs() data 가져오기
    // Executes the query and returns the results as a QuerySnapshot.
    const getFireBase = async () => {
      let test_obj = [];

      const data = await getDocs(nweetCollectionRef);
      // data.docs.map((doc) => console.log(doc.data()))
      setContents(data.docs.map((doc) => ({...doc.data()})))
      // data.docs.map((doc) => {
      //   test_obj.push(doc.data())
      // })
      // setContents(test_obj);
    }
    getFireBase();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    addDoc(nweetCollectionRef, {
      upload,
      createdAt: Date.now()
    });
    setUpload("");
  }
  const onChange = (event) => {
    const {target:{value}} = event;
    setUpload(value);
  }
  
  return<>
  <form onSubmit={onSubmit}>
    <input type="text" placeholder="What's on your mind?" 
      maxLength={120} 
      onChange={onChange}
    />
    <input type="submit" value="Upload" />
  </form>

  <div>
    <h2>list</h2>
    <ul>
    {
      contents.map((cont, index) => {
        return <li key={index}>
          <span>{cont.upload}</span>
          <span>{cont.createdAt}</span>
        </li>
      })
    }
    </ul>
  </div>
  </>
}

export default Home;