import {connect} from 'react-redux';
import {Counter} from './Counter';
import {Increment} from '../redux/actions'
import {getDataAsync} from '../redux/operations'


const mapStateToProps = (state) =>({
     counterValue : state.CounterReducer.counter,
     api_Data : state.ApiReducer.data
})
    


const mapDispatchToProps = {
    incCounter : Increment,
    getDataAsync

}

export default connect(mapStateToProps,mapDispatchToProps)(Counter)

