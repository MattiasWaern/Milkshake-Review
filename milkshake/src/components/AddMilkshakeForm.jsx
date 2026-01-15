import { useState } from 'react';

function AddMilkshakeForm({ onAdd }) {
  const initialForm = {
    name: '',
    place: '',
    rating: '',
    comment: '',
    imageUrl: '',
    reviewer: '',
    price: '',
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };


  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      location: { ...prev.location, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.place) return;

    const milkshake = {
      ...form,
      rating: Number(form.rating),
      price: form.price ? Number(form.price) : null,
    };

    onAdd(milkshake);
    setForm(initialForm);
  };

  return (
    <div className="add-form">
      <h2>Lägg till milkshake</h2>

      <div className="form-grid">
        <input
          name="name"
          placeholder="Milkshake-namn"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="place"
          placeholder="Ställe"
          value={form.place}
          onChange={handleChange}
          required
        />

        <input
          name="reviewer"
          placeholder="Ditt namn"
          value={form.reviewer}
          onChange={handleChange}
        />

        <input
          name="rating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          placeholder="Betyg (0–10)"
          value={form.rating}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="pris"
          value={form.price}
          onChange={handleChange}
        />
        
        <input
          name="imageUrl"
          type="url"
          placeholder="Bild-URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="full-width"
        />

        <textarea
          name="comment"
          placeholder="Review"
          value={form.comment}
          onChange={handleChange}
          className="full-width"
        />

      </div>

      <button type="submit" onClick={handleSubmit}>Spara recension</button>
    </div>
  );
};

export default AddMilkshakeForm;