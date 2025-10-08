export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center" style={{ padding: '2rem 0' }}>
      <div className="spinner"></div>
      <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>Loading...</span>
    </div>
  );
}