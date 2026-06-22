import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      className="cat-card"
      onClick={() => navigate(`/categories/${category.id}`)}
      style={{ borderTop: `3px solid ${category.color}` }}
    >
      <div className="icon">{category.icon}</div>
      <div className="name">{category.name}</div>
      <div className="desc">{category.description}</div>
      <div className="sub-badge">{category.subcategories.length} topics</div>
    </div>
  );
}