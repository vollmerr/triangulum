import React from 'react';
import PropTypes from 'prop-types';

export default class SvgTextElement extends React.PureComponent {
  
  /** 
   * MODIFIED
   *
   * All of the following methods were added to the SvgTextElement class
   * to handle showing/hiding full label when mousing over/out of 
   * the label.
   */
  
  // Constructor calls label initialization methods 
  constructor(props) {
    super(props);
    this.state = {
      fullLabel: this.props.name,
      exceedsMaxLabelLength: this.checkLabelLength(this.props.name),
      shortenedLabel: this.trimLabel(this.props.name),
      activeLabel: this.assignLabel(this.props.name),
    }
  }

  // Assigns bool if node name is greater than max length 
  checkLabelLength = (name) => {
    return (name.length > 15) ? 1 : 0;
  }

  // Assigns trimmed label if node name is greater than max length
  trimLabel = (name) => {
    return (name.length > 15) ? (name.slice(0, 14) + "...") : null;
  }
  
  // Assigns initial label if node name is greater than max length
  assignLabel = (name) => {
    return (name.length > 15) ? (name.slice(0, 14) + "...") : name.concat("");
  }

  // Handles mouse over event
  handleOnMouseOver = () => {
    this.expandLabel();
  }

  // Handles mouse out event
  handleOnMouseOut = () => {
    this.contractLabel();
  }

  // Reassigns active label to full label 
  // setState() triggers re-render
  expandLabel = () => {
    if (this.state.exceedsMaxLabelLength) 
      this.setState({ activeLabel: this.state.fullLabel.concat("") });
  }

  // Reassigns active label to shortened label
  // setState() triggers re-render
  contractLabel = () => {
    if (this.state.exceedsMaxLabelLength)
      this.setState({ activeLabel: this.state.shortenedLabel.concat("") });
  }
    
  /**
   * MODIFIED
   *
   * Removed name, attributes, from props assignment. Added nodeData
   * to props assignment, to have access to url for anchor element.
   *  
   * Added a surrounding anchor element to svg text label, so user's can 
   * open the site url in a new page. Pass it mouseover/mouseout handlers
   *
   * Change textLayout.x transform value based on if it is target node,
   * since this node will be larger
   *
   * Added state variable for label so can handle maximizing and 
   * minimizing label
   *
   * Removed text element for attributes (not displayed in our project)
   */
  render() {
    const { nodeData, textLayout } = this.props;
    textLayout.x = nodeData.data.targetFound ? 28 : 14;
    return (
      <a
        href={"http://" + nodeData.data.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseOver={this.handleOnMouseOver}
        onMouseOut={this.handleOnMouseOut}
      >
        <g>
          <text
            className="nodeNameBase"
            textAnchor={textLayout.textAnchor}
            x={textLayout.x}
            y={textLayout.y}
            transform={textLayout.transform}
            dy=".35em"
          >            
            {this.state.activeLabel}
          </text>
        </g>
      </a>
    );
  }
}

SvgTextElement.defaultProps = {
  attributes: undefined,
};

SvgTextElement.propTypes = {
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  textLayout: PropTypes.object.isRequired,
  nodeStyle: PropTypes.object.isRequired,
};
