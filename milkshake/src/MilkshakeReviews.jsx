import React, { useState, useEffect } from 'react';
import { Plus, X, Trophy, Swords, Target, Download } from 'lucide-react';
import ReviewCard from './components/ReviewCard';
import './styles/App.css';

export default function MilkshakeReviews (){
  

    const [reviews, setReviews] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentView, setCurrentView] = useState('places');
    const [formData, setFormData] = useState({
        place: '', location: '', flavor: '', rating: 5, price: '',
        date: new Date().toISOString().split('T')[0], review: '', reviewer: ''
    });

    useEffect(() => {loadData(); }, []);

    const loadData = async () => {
        try {
            const keys = await window.Storage.list('review');
            if(keys?.keys){
                const loaded = await Promise.all(keys.keys.map(async k => JSON.parse((await window.Storage.get(k)).value)));
                setReviews(loaded.sort((a,b) => new Date(b.date) - new Date(a.date)));
            }
        } catch (e) {console.log("Laddar"); }
    } 
}