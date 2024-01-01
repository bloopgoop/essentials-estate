export default function ErrorPage( {props} ) {

  console.log( props );

  return (
    <div id="error-page">
      { !props 
      ? 
      <>
        <h1>404</h1>
        <p>Page not found</p>
      </>
      : 
      <>
        <h1>{props.code}</h1>
        <p>{props.error}</p>
      </>
      }
    </div>
  );
}