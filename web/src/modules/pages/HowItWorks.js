// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import Icon from '../../ui/icon'
import { textLevel1 } from '../../ui/common/shadows'
import { white, grey, grey2, grey3 } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import crateRoutes from '../../setup/routes/crate'
import userRoutes from '../../setup/routes/user'

// Component
const HowItWorks = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>Cómo funciona? - Canasta</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">Cómo funciona</H3>

        <p style={{ marginTop: '1em', color: grey2 }}>Tan solo 3 sencillos pasos para suscribirse y recibir su suscripción
          mensual
          de ropa y accesorios de moda</p>
      </GridCell>
    </Grid>

    {/* 1 - Fill Out Your Style Profile */}
    <Grid>
      <GridCell justifyCenter={true} style={{ textAlign: 'center', padding: '8em 0em' }}>
        <Icon size={4} style={{ color: grey3, textShadow: textLevel1 }}>looks_one</Icon>

        <H4 style={{ marginTop: '0.5em', textTransform: 'uppercase' }}>Suscríbase a su canasta</H4>

        <p style={{ marginTop: '0.5em', color: grey3 }}>Escoja una o más canastas de acuerdo a su necesidad.</p>
      </GridCell>

      <GridCell style={{ background: `url('${ APP_URL }/images/stock/how-it-works/1.jpg') center top no-repeat` }}/>
    </Grid>

    {/* 2 - Receive a Fix Delivery */}
    <Grid>
      <GridCell style={{ background: `url('${ APP_URL }/images/stock/how-it-works/2.jpg') center top no-repeat` }}/>

      <GridCell justifyCenter={true} style={{ textAlign: 'center', padding: '8em 0em' }}>
        <Icon size={4} style={{ color: grey3, textShadow: textLevel1 }}>looks_two</Icon>

        <H4 style={{ marginTop: '0.5em', textTransform: 'uppercase' }}>Reciba una entrega fija</H4>

        <p style={{ marginTop: '0.5em', color: grey3 }}>Obetenga 3 o 5 piezas de ropa o accesorios entregadas en la puerta de sy casa.</p>
      </GridCell>
    </Grid>

    {/* 3 - Keep what you want */}
    <Grid>
      <GridCell justifyCenter={true} style={{ textAlign: 'center', padding: '8em 0em' }}>
        <Icon size={4} style={{ color: grey3, textShadow: textLevel1 }}>looks_3</Icon>

        <H4 style={{ marginTop: '0.5em', textTransform: 'uppercase' }}>Conseva lo que quieres</H4>

        <p style={{ marginTop: '0.5em', color: grey3 }}>Solo paga por lo que te quedas. Las devoluciones son fáciles y gratuitas.</p>
      </GridCell>

      <GridCell style={{ background: `url('${ APP_URL }/images/stock/how-it-works/3.jpg') center top no-repeat` }}/>
    </Grid>

    {/* Bottom call to action bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '3em', textAlign: 'center' }}>
        {
          props.user.isAuthenticated
            ? <Link to={crateRoutes.list.path}>
                <Button theme="primary">Subscribe <Icon size={1.2} style={{ color: white }}>navigate_next</Icon></Button>
              </Link>
            : <Link to={userRoutes.signup.path}>
                <Button theme="primary">Start <Icon size={1.2} style={{ color: white }}>navigate_next</Icon></Button>
              </Link>
        }
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
HowItWorks.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function howItWorksState(state) {
  return {
    user: state.user
  }
}

export default connect(howItWorksState, {})(HowItWorks)
