import { Component } from 'react';
import schedule from '../../data/schedule';
import { styles } from '../../constants';


class ScheduleTabSelector extends Component {
  constructor() {
    super();
    this.state = {
      activePosition: 0,
    };
    this.buildButtonSection = this.buildButtonSection.bind(this);
  }

  handleClick(position) {
    return () => this.setState({
      activePosition: position,
    });
  }

  buildButtonSection() {
    const { activePosition } = this.state;

    return schedule.map((item) => {
      const active = item.index === activePosition ? 'active' : '';
      return (
        <button
          key={item.section}
          className={`tabselector-button ${active}`}
          onClick={this.handleClick(item.index)}
        >
          <div>{ item.section }</div>
          <div>{ item.date }</div>
        </button>
      );
    });
  }

  buildContent() {
    const { activePosition } = this.state;
    const data = schedule[activePosition].activities;
    return data.map(activity => (
      <div key={activity.title}className="activity-row clearfix">
        <div className="activity-location">
          <div className="room-and-time">
            <div>{ activity.time }</div>
            <div>{ activity.room }</div>
          </div>
          <div className="speaker-image">
            <img
              src={`static/img/speakers/${activity.speakerImage}`}
              alt={activity.speakerName}
            />
          </div>
        </div>
        <div className="activity-details">
          <div>
            <span>{ activity.type }: </span>
            <span>{ activity.title }</span>
          </div>
          <div>
            <span className="speaker-name" >{activity.speakerName}</span>
            <span>, { activity.speakerPosition }</span>
            <span>, { activity.speakerCompany }</span>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const buttons = this.buildButtonSection();
    const content = this.buildContent();

    return (
      <div>
        <Style />
        <div className="buttons-section clearfix">{ buttons }</div>
        <div className="check-in">08:00 - 09:00 CHECK-IN & COFFEE</div>
        <div className="content-section">{ content }</div>
        <div className="breaks-section">
          <div className="break-schedule">11:00 - 11:30 COFFEE BREAK</div>
          <div className="break-schedule">13:00 - 14:00 LUNCH BREAK</div>
        </div>
        <button className="buy-ticket-button">
          <a
            href="#schedule"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Your Workshop Ticket
          </a>
        </button>
      </div>
    );
  }
}

const Style = () => (
  <style jsx="true">{`
        .clearfix:after {
            display: table;
            content: "";
            clear: both;
        }

        .tabselector-button {
            background-color: ${styles.mainColor3};
            height: 60px;
            width: 33.3333%;
            float: left;
            color: ${styles.mainColor6};
            font-weight: bold;
            border: none;
            font-size: 18px;
            border-radius: 0;
            transition: background-color .5s, color .5s;
        }

        .tabselector-button:hover,
        .tabselector-button.active
        {
            background-color: ${styles.mainColor6};
            color: ${styles.mainColor3};
        }

        .content-section {
            margin-bottom: 20px;
            float: left;
            width: 100%;
        }

        .check-in,
        .break-schedule
        {
            color: ${styles.mainColor3};
            font-size: 18px;
            text-align: center;
            font-weight: bold;
            margin: 10px 0;
            float: left;
            width: 100%;
        }

        .check-in {
            margin: 50px 0;
        }

        .breaks-section {
            float: left;
            width: 100%;
            margin: 50px 0;
        }

        .buy-ticket-button {
            height: 60px;
            width: 270px;
            text-align:center;
            background-color: ${styles.mainColor6};
            color: ${styles.mainColor3};
            border-radius: 8px;
            border: none;
            font-size: 18px;
            font-weight: bold;
            display: block;
            margin: 0 auto;
        }

        .tabselector-button:focus,
        .buy-ticket-button:focus
        {
            outline: 0;
        }

        .buy-ticket-button a {
          color: ${styles.mainColor3};
          height: 100%;
          width: 100%;
          display: block;
          line-height: 60px;
          text-decoration: none;
        }

        .content-section img {
            width: 60px;
            height: 60px;
            border: 5px solid #CCC;
            filter: grayscale( 100% );
        }

        .activity-row {
            padding: 20px 0;
            border-bottom: 1px solid ${styles.mainColor3};
            width: 100%;
            color: ${styles.mainColor3};
            font-size: 18px;
            font-weight: 500;
        }

        .activity-location {
            width: 35%;
            float: left;
        }

        .activity-details {
            width: 65%;
            float: left;
        }

        .speaker-name {
            color: ${styles.mainColor6};
        }

        .room-and-time {
            width: 55%;
            float: left;
        }

        .speaker-image {
            width: 45%;
            float: left;
        }
    `}</style>
);

export default ScheduleTabSelector;
