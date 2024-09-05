import React from 'react';
import Typed from 'typed.js';

function Typedjs() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<b>Bookmark This Page ✅</b> '],
      typeSpeed: 100,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className=" ">
      <span
        className='
        text-black  font-semibold'
        ref={el} />
    </div>
  );
}

export default Typedjs