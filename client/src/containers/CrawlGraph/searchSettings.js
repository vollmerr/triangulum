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

  render() {
    if(this.props.targetedSearch) {
      return (
        <div id="settingsContainer">
          <table>
            <tbody>  
              <tr>
                <th>Starting URL:</th>
                <td>{this.props.url}</td>
              </tr>
              <tr>
                <th>Search Type (Hop Limit):</th>
                <td>{this.props.type} ({this.props.hopLimit})</td>
              </tr>
              <tr>
                <th>Keyword (Status):</th>
                <td>{this.props.target} ({this.props.targetFound})</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (
        <div id="settingsContainer">
          <table>
            <tbody>
              <tr>
                <th>Starting URL:</th>
                <td>{this.props.url}</td>
              </tr>
              <tr>
                <th>Search Type (Hop Limit):</th>
                <td>{this.props.type} ({this.props.hopLimit})</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}
