import React from 'react';

//import {store} from '../../store';
import {ReducerBase} from '../ReducerBase';


export class ContactStore extends ReducerBase {
  render() {
    //let order = store.getState().order;

    return (
      <div className="container summary-form">

        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <label>Line Id:</label>
                <img src={''} role="presentation" className="img-rounded" />
            </div>
          </div>
        </div>

      </div>


    );
  }
}

export default ContactStore;
