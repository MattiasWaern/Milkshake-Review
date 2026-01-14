import { useState } from 'react';

function AddMilkshakeForm({ onAdd }) {
  const initialForm = {
    name: '',
    place: '',
    rating: '',
    comment: '',
    imageUrl: '',
    reviewer: ''
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.place) return;

    onAdd({
      ...form,
      rating: Number(form.rating)
    });

    setForm(initialForm);
  };

  return (
    <div className="add-form" onSubmit={handleSubmit}>
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
          step="1"
          placeholder="Betyg (0–10)"
          value={form.rating}
          onChange={handleChange}
          required
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
          placeholder="Kommentar"
          value={form.comment}
          onChange={handleChange}
          className="full-width"
        />
      </div>

      <button type="submit" onClick={handleSubmit}>Spara recension</button>
    </div>
  );
}

export default AddMilkshakeForm;