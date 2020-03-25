import {connect} from 'react-redux';
import {Counter} from './Counter';
import {Increment} from '../redux/actions'


const mapStateToProps = (state) =>({
     counterValue : state.CounterReducer.counter,
})
    


const mapDispatchToProps = {
    incCounter : Increment
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter)

