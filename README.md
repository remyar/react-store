# react-navigation
Navigation provider for react

## Installation
This library was built with React >=18 in mind. It *might* work on lower versions
as well, but the lib is developed for and tested on those versions.
```
npm install @remyar/react-store --save
```

## Usage
The lib exposes the following methods:

### StoreProvider
```javascript
import  StoreProvider from '@remyar/react-store';
...

 root.render(
        <React.Fragment>
            <StoreProvider globalState={{}} >
                 <App /> --> Your Application
            </StoreProvider>
        </React.Fragment>
    );
``` 

### withStoreProvider
``` javascript
import { useStore } from '@remyar/react-store';
...

function YourReactComponent(props) {

    const [globalState, dispatch] = useStore();
    
    return <div>
        <MenuItem onClick={() => {
                await dispatch(actions.database.get());
            }}>
        </MenuItem>
        </div>
}

export default withStoreProvider(YourReactComponent);
``` 