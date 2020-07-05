// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import { white, black } from '../../../ui/common/colors'

// App Imports
import { getList as getCrateList, remove as removeCrate } from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import AdminMenu from '../common/Menu'
import admin from '../../../setup/routes/admin'

// Component
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getCrateList('DESC'))
  }

  // Runs on client only
  componentDidMount() {
    this.props.getCrateList('DESC')
  }

  remove = (id) => {
    if (id > 0) {
      let check = confirm('Está seguro que desea eliminar esta canasta?')

      if (check) {
        this.props.messageShow('Borrando, por favor espere...')

        this.props.removeCrate({ id })
          .then(response => {
            if (response.status === 200) {
              if (response.data.errors && response.data.errors.length > 0) {
                this.props.messageShow(response.data.errors[0].message)
              } else {
                this.props.messageShow('Canasta borrada exitosamente.')

                this.props.getCrateList(false)
              }
            } else {
              this.props.messageShow('Por favor intente de nuevo.')
            }
          })
          .catch(error => {
            this.props.messageShow('Ha ocurrido un error. Por favor intente de nuevo.')

          })
          .then(() => {
            this.setState({
              isLoading: false
            })

            window.setTimeout(() => {
              this.props.messageHide()
            }, 5000)
          })
      }
    }
  }

  render() {
    const { isLoading, list } = this.props.crates

    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Canastas - Admin - Canasta</title>
        </Helmet>

        {/* Top menu bar */}
        <AdminMenu/>

        {/* Page Content */}
        <div>
          {/* Top actions bar */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell style={{ textAlign: 'right' }}>
              <Link to={admin.crateCreate.path}>
                <Button theme="secondary" style={{ marginTop: '1em' }}>
                  <Icon size={1.2} style={{ color: white }}>add</Icon> Add
                </Button>
              </Link>
            </GridCell>
          </Grid>

          {/* Crate list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <table className="striped">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th style={{ textAlign: 'center' }}>Acciones</th>
                </tr>
                </thead>

                <tbody>
                {
                  isLoading
                    ? <tr>
                        <td colSpan="6">
                          <Loading message="Cargando canastas..."/>
                        </td>
                      </tr>
                    : list.length > 0
                      ? list.map(({ id, image, name, description, createdAt, updatedAt }) => (
                          <tr key={id}>
                            <td>
                              { name }
                            </td>

                            <td>
                              { description }
                            </td>

                            <td>
                              { new Date(parseInt(createdAt)).toDateString() }
                            </td>

                            <td>
                              { new Date(parseInt(updatedAt)).toDateString() }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              <Link to={admin.crateEdit.path(id)}>
                                <Icon size={2} style={{ color: black }}>mode_edit</Icon>
                              </Link>

                              <span style={{ cursor: 'pointer' }} onClick={this.remove.bind(this, id)}>
                                <Icon size={2} style={{ marginLeft: '0.5em' }}>delete</Icon>
                              </span>
                            </td>
                          </tr>
                        ))
                      : <tr>
                          <td colSpan="6">
                            <EmptyMessage message="No hay canastas para mostrar."/>
                          </td>
                        </tr>
                }
                </tbody>
              </table>
            </GridCell>
          </Grid>
        </div>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  crates: PropTypes.object.isRequired,
  getCrateList: PropTypes.func.isRequired,
  removeCrate: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    crates: state.crates
  }
}

export default connect(listState, { getCrateList, removeCrate, messageShow, messageHide })(List)
