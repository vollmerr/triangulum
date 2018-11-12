import React, { Component } from 'react'
import './style.css';

/**
 * Search Settings Component
 *
 * Renders a table component that contains the relevant search parameters
 *
 * Passed props:
 * url - string of starting url
 * target - string of keyword for search
 * type - string representing search type (bfs, dfs)
 * hopLimit - string representing hop limit for search
 * targetedSearch - bool for targeted search
 * targetFound - string representing if target was found
 */
export default class SearchSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.props}
  }

  render() {
    if(this.state.targetedSearch) {
      return (
        <div id="settingsContainer">
          <table>
            <tr>
              <th>Starting URL:</th>
              <td>{this.state.url}</td>
            </tr>
            <tr>
              <th>Search Type (Hop Limit):</th>
              <td>{this.state.type} ({this.state.hopLimit})</td>
            </tr>
            <tr>
              <th>Keyword (Status):</th>
              <td>{this.state.target} ({this.state.targetFound})</td>
            </tr>
          </table>
        </div>
      );
    }
    else {
      return (
        <div id="settingsContainer">
          <table>
            <tr>
              <th>Starting URL:</th>
              <td>{this.state.url}</td>
            </tr>
            <tr>
              <th>Search Type (Hop Limit):</th>
              <td>{this.state.type} ({this.state.hopLimit})</td>
            </tr>
          </table>
        </div>
      );
    }
  }
}
