export default {
  ALERT_GENERIC: {
    id: 'ALERT_GENERIC',
    description: 'generic catch all error',
    defaultMessage: 'something broke... This WILL be more specific once we have error copy',
  },
  ALERT_ENDPOINT_DOWN: {
    id: 'ALERT_ENDPOINT_DOWN',
    description: 'response.state.status was undefined, so endpoint/backend is probably down',
    defaultMessage: "Looks like the endpoint is down.  More than likely we are deploying new backend changes",
  }
}