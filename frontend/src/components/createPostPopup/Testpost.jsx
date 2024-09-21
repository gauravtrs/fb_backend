import { useRef, useEffect } from "react";

export default function TestComponent() {
  const testRef = useRef(null);

  useEffect(() => {
    console.log('testRef:', testRef.current); // Should log the input element
    console.log('new test case:',testRef)
  }, []);

  return (
    <div>
      <input type="file" ref={testRef} />
    </div>
  );
}
