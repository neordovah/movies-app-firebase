import React from 'react'
import {getDocs, collection, addDoc, updateDoc, doc, getDoc} from "firebase/firestore"
import {db} from "./firebase-config"


const userCollectionRef = collection(db, "users")

export const getUsers = async () => {
    try {
        let data = await getDocs(userCollectionRef)
        data = data.docs.map((doc) => ({ 
            ...doc.data(), 
            id: doc.id }))
        return [...data]
    } catch (err) {
        console.log(err)
    }   
}

export const addUser = async (name, username, password) => {
    try {
        await addDoc(userCollectionRef, {
            name, username, password, friends: [], recs: []
        })
    } catch (err) {
        console.log(err)
    }   
}

export const updateUser = async (id, name, password) => {
    try {
        let docRef = doc(db, "users", id)
        await updateDoc(docRef, {name, password})
    } catch (err) {
        console.log(err)
    }   
}

export const updateUserFriends = async (id, friends) => {
    try {
        let docRef = doc(db, "users", id)
        await updateDoc(docRef, {friends})
    } catch (err) {
        console.log(err)
    }   
}

export const getUser = async (id) => {
    try {
        let docRef = doc(db, "users", id)
        let data = getDoc(docRef).then((doc) => doc = { 
            ...doc.data(), 
            id: doc.id })
        //console.log(data)
        return data
    } catch (err){
        console.log(err)
    }
}