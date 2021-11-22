import { Heading } from '@twilio-paste/core/heading'
import SegmentLogo from '../../images/segment.png'
import { withTaskContext } from '@twilio/flex-ui'
import { Timeline, TimelineEvent } from 'react-event-timeline'
import { EventStream2Styles } from './EventStream2.Styles'
import moment from 'moment'

import WebIcon from '@mui/icons-material/Web'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import PersonIcon from '@mui/icons-material/Person'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import React from 'react'
const { SyncClient } = require('twilio-sync')

const syncTokenUrl = process.env.REACT_APP_SERVICE_URL + '/sync-token'
const imageBaseUrl = process.env.REACT_APP_IMAGE_URL

const sourceImage = {
  float: 'right',
}

class EventStream extends React.Component {
  state = {
    status: 'connecting...',
    errorMessage: '',
    events: [],
    dataLoaded: false,
    syncToken: null,
    updateMessage: null,
  }

  componentDidMount() {
    // fetch an access token from the localhost server
    this.retrieveToken()
  }

  componentDidUpdate(prevProps) {
    // This is to highlight how updating based on task change works
    console.log('prevProps', prevProps)
    console.log('current props', this.props)
    if (prevProps.task.sid !== this.props.task.sid) {
      //fetch list items for new task
      console.log('updating event list')
      this.loadFormData()
    }
  }

  async retrieveToken() {
    fetch(syncTokenUrl)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ syncToken: result.token })

        let accessToken = result.token
        if (accessToken != null) {
          if (this.client) {
            // update the sync client with a new access token
            this.refreshSyncClient(accessToken)
          } else {
            // create a new sync client
            this.createSyncClient(accessToken)
          }
        } else {
          this.setState({ errorMessage: 'No access token found in result' })
        }
      })
  }

  createSyncClient(token) {
    const client = new SyncClient(token)
    client.on('connectionStateChanged', (state) => {
      if (state === 'connected') {
        this.client = client
        this.setState({ status: 'connected', errorMessage: '' })
        this.loadFormData()
        // component.subscribeToNewEvents();
      } else {
        this.setState({
          status: 'error',
          errorMessage: `Error: expected connected status but got ${state}`,
        })
      }
    })
    client.on('tokenAboutToExpire', () => {
      this.retrieveToken()
    })
    client.on('tokenExpired', () => {
      this.retrieveToken()
    })
  }

  refreshSyncClient(token) {
    this.client.updateToken(token)
  }

  async getAllItems(list) {
    const result = []
    let page = await list.getItems()
    result.push(...page.items)

    while (page.hasNextPage) {
      page = await page.nextPage()
      result.push(...page.items)
    }
    return result
  }

  async loadFormData() {
    const { attributes } = this.props.task
    if (!attributes.segment_data?.traits?.id) {
      console.warn('no segment user')
      this.setState({ dataLoaded: true })
      return
    }
    this.client.list(attributes?.segment_data?.traits?.id).then((list) => {
      list
        .getItems({ order: 'desc' })
        .then((data) => {
          let events = []
          data.items.forEach((segmentEvent) => {
            events.push(segmentEvent.data)
          })

          this.setState({
            events,
            dataLoaded: true,
            list,
          })
        })
        .catch((error) => {
          console.error('List getItems() failed', error)
        })

      list.on('itemAdded', (args) => {
        if (!args.isLocal) {
          console.log('Sync Updated Data, adding to state.', args.item.data)

          this.setState((prevState) => ({
            events: [args.item.data, ...prevState.events],
          }))
        }
      })
    })
  }

  getImage(item) {
    let titleType = 'films'

    try {
      const titleUrl = `${imageBaseUrl}/images/${titleType}/${item.properties.cardItem.genre}/${item.properties.cardItem.slug}/small.jpg`

      return <img src={titleUrl} />
    } catch (error) {
      try {
        titleType = 'series'
        const seriesUrl = `${imageBaseUrl}/images/${titleType}/${item.properties.cardItem.genre}/${item.properties.cardItem.slug}/small.jpg`
        return <img src={seriesUrl} />
      } catch (error) {
        return null
      }
    }
  }

  render() {
    const { dataLoaded, events } = this.state
    if (!dataLoaded) return <div>Loading event data...</div>

    const segmentEventList = events.map((item, idx) => (
      <React.Fragment key={'event-item-' + idx}>
        {item.type == 'identify' && (
          <TimelineEvent
            className="timeline"
            title={item.userId}
            subtitle={moment(item.timestamp).fromNow()}
            icon={<PersonIcon />}
          />
        )}

        {item.type == 'page' && (
          <TimelineEvent
            className="timeline"
            title={item.properties.path}
            subtitle={moment(item.timestamp).fromNow()}
            icon={<WebIcon />}
          />
        )}

        {item.type == 'track' && item.event == 'Title Preview' && (
          <TimelineEvent
            className="timeline"
            title={item.event + ' - ' + item.properties.cardItem.title}
            subtitle={moment(item.timestamp).fromNow()}
            icon={<PlayArrowIcon />}
          >
            {this.getImage(item)}
          </TimelineEvent>
        )}

        {item.type == 'track' && item.event != 'Title Preview' && (
          <TimelineEvent
            className="timeline"
            title={item.event}
            subtitle={moment(item.timestamp).fromNow()}
            icon={<LabelImportantIcon />}
          />
        )}
      </React.Fragment>
    ))

    return (
      <React.Fragment>
        <Heading as="h4" variant="heading40">
          <span>
            <img style={sourceImage} src={SegmentLogo} height="20px" />
          </span>
          <span>RealTime Event Stream</span>
        </Heading>

        <EventStream2Styles>
          <div className="timelineContainer">
            <Timeline className="timeline">{segmentEventList}</Timeline>
          </div>
        </EventStream2Styles>
      </React.Fragment>
    )
  }
}

export default withTaskContext(EventStream)
