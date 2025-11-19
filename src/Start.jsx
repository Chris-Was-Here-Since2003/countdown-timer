function StartButton({ onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      Start Timer
    </button>
  );
}

export default StartButton;
