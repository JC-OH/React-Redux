# Reference

> - **store**: React.js 프로젝트에서 사용하는 모든 동적 데이터들을 담아두는 곳 입니다.
> - **action**: 어떤 변화가 일어나야 할 지 나타내는 객체입니다.
> - **reducer**: action 객체를 받았을 때, 데이터를 어떻게 바꿀지 처리할지 정의하는 객체입니다.
## Install Dependencies
React.js 에서 Redux 를 사용 할 때, 두가지의 의존 모듈이 사용됩니다.
- **redux**
- **react-redux**: React.js 프로젝트에서 Redux 를 더 편하게 사용 할 수 있게 해줍니다.
```angular2
npm install --save redux react-redux
```

## Redux
### Actions (actions/index.js)
- 값을 증가 시키기 increment() return {type: "INCREMENT"}
- 값을 감소 시키디 decrement() return {type: "DECREMENT"}
- 새로운 색상 설정하기 setColor(color) return {type: "SET_COLOR", color: [200,200,200]}

#### Action Types (actions/ActionTypes.js)
- INCREMENT
- DECREMENT
- SET_COLOR
```angular2
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COLOR = "SET_COLOR";
```

### Reducer (reducers/counter.js)
변화를 일으키는 함수 -> **순수**해야함.
**이전 상태**와 **액션**을 받아서 **다음 상태**를 반환한다. 

이전 상태를 변경하는게 아님. 그저 새로운 상태를 반환하는 것! -> 기존 상태를 복사하고, 변화를 준다음에 반환.
```angular2
(previousState, action) => newState
```
> - 비동기 작업 X
> - 인수 변겨 X
> - 동일한 인수 = 동일한 결과

### Store (index.js)
어플리케이션의 현재 상태를 지니고 있음.

Store를 생성하기 위해서는 **createStore** 함수를 호출함.

```angular2
import { createStore } from 'redux';
import reducers from './reducers';
const store = createStore(reducers);
```

```angular2
import { createStore } from 'redux';
import reducers from './reducers';
import * as actions from './actions';

const store = createStore(reducers);

console.log(store.getState());
// store에 변화가 있을때, 실행될 Callback 함수를 등록 시킴.
const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(actions.increment());
store.dispatch(actions.increment());
store.dispatch(actions.decrement());
store.dispatch(actions.setColor([200, 200, 200]));

unsubscribe();

```

#### dispatch(action)
action을 reducer로 보낸다는 것입니다.

- dispatch가 실행되면 store는 reducer에 현재 자신 상태와 방금 전달받은 액션을 전달해 줌.
- reducer가 어떤 변화가 필요한지 판단하여 변화를 주고 새 상태로 변경함.

#### getState()
현재 상태를 변화하는 함수.

#### subscribe(listener)
상태가 바귈때 마다 실행을 함수를 등록함.

**listener**는 상태가 바뀔때 마다 실행될 Callback 함수임.

#### replaceReducer(nextReducer)
Hot-reloading과 Code Split를 구현할때 사용됨.

## React-Redux
React-Redux는 뷰 레이어(View Layer) 바인딩 도구입니다. 뷰 레이어 바인딩은 뷰 트리(View Tree)를 위한 **IT 부서**와 같다.

모든 컴포넌트를 스토어에 연결하는 역할을 하며, 많은 기술적인 세부사항등을 처리해서 트리구조가 세부 사항에 신경 쓰지 않도록 해 줍니다.

React Component에서 Redux를 사용할때 복잡한 작업을 React-Redux가 다 합니다.

### Provider
React Component에서 Redux를 사용하도록 서비스를 제공해 줍니다. Provider는 하나의 React Component입니다.

Store를 사용할  React Component를 Provider Component안에 감싸 주면, Provider가 복잡한 작업들을 알아서 해줍니다.
```html
<Provider store={store}>
    <App/>
</Provider>
```

```angular2
import { Provider } from 'react-redux';
ReactDOM.render(
    <Provider store={store}>
        <App/>,
    </Provider>
    document.getElementById('root')
)
```

### connect([...options])
컴포넌트를 Redux에 연결하는 함수를 반환합니다.

```angular2
connnect(
    [mapStateToProps],
    [mapDispatchToProps],
    [mergeProps],
    [options]
)

{[prue = true], [withRef = false]}
```

```angular2
import React, {Component} from 'react';
import Control from './Control'
import Value from './Value'
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions'


class Counter extends Component {
    static propTypes = {
    }

    static defaultProps = {
    }

    render() {
        return (
            <div>
                <Value/>
                <Control/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    };
}

const mapDispatchToProps = (dispatch) => {
    // return bindActionCreators(actions, dispatch);
    return {
        handleIncrement: () => {
            dispatch(actions.increment())
        },
        handleDecrement: () => {
            dispatch(actions.decrement())
        },
        handleSetColor: (color) => {
            dispatch(actions.setColor(color))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

#### connect()(Counter)
store에 연결된 새로운 컴포넌트 클래스가 변환됨. 이함수는  리덕스에 연결된 새로운 컴포넌트 클래스 리턴합니다.

기본에 있던 컴포넌트가 변경되는 것인 아니고, 새로운 컴포넌트가 반환됩니다.

옵션이 없으면 this.props.stroe로 접근 가능함.
# Manual
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
