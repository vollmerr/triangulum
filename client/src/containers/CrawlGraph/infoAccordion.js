import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import './style.css';

/**
 * Info Accordion Component
 *
 * A collapsible semantic-react component that displays information about 
 * using the graph
 * Adapted from https://react.semantic-ui.com/modules/accordion/
 *
 * No passed parameters
 */
export default class InfoAccordion extends Component {
  state = { activeIndex: -1 }

  // Handles expanding/collapsing component
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Information
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p id="infoText"> 
            Click on nodes to expand the tree. Only nodes with a colored inside have children.<br />
            Click the node label to open the site in a new tab. Mouse over label to show url and expand (if applicable).<br />
            Zoom with scrolling. Drag with mouse to pan.<br />
            For targeted searches, green nodes are sites along the target path. 
            The large, red node is the site with the keyword.<br />
            If the node label is covered, please collapse the node to view the full label.
          </p>
          <div
            style={{height: '1px'}}
          >
          </div>
        </Accordion.Content>
      </Accordion>
    )
  }
}
