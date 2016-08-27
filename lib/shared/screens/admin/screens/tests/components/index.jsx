
import React, {PropTypes} from 'react';

export default class Test extends React.Component {
    static fragments = {
        tests: {
            _id: 1,
            name: 1,
        }
    };

    static propTypes = {
        tests: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
    };

    onChange (event) {
      this.props.changeName(event.target.value);
    }

    render () {
        const {tests, name, waiting, changeName, addName, removeName} = this.props;
        return (
            <div>
                <input
                    type='text'
                    value={name}
                    placeholder='Input A Name'
                    onChange={::this.onChange}
                    />
                <button  onClick={addName} style={{color:'blue'}}>
                    添加
                </button>
                {waiting && <div>Loding...</div>}
                <ul>
                    {tests.map((item, i)=>
                        <li key={i}>
                            {item.name}
                            <button  onClick={removeName.bind(null, item._id)} style={{color:'red', marginLeft:20, fontSize: 10}}>
                                删除
                            </button>
                        </li>
                    )}
                </ul>
            </div>
    )
}
}
