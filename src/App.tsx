import React, { useEffect } from 'react';
import DefaultLayout from './layout/default';
import LeftPanel from './components/left-panel';
import Playground from './components/playground';


function App() {
  useEffect(()=>{
  },[])
  return (
    <>
       <DefaultLayout
        sidePanel={<LeftPanel />}
        playground={<Playground />}
        // rightPanel={<RightPanel />}
      />
    </>
  );
}

export default App;
