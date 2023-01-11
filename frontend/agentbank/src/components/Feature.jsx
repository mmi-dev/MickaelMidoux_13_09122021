/**
 * home page feature's bloc
 * @param {string} props.title feature name
 * @param {string} props.icon icon url
 * @param {string} props.alt icon alt text
 * @param {string} props.text feature text
 */
function Feature({ title, icon, alt, text }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default Feature;
