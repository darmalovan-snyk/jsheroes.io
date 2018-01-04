import Link from 'next/link';
import { styles } from '../../constants';
import speakers from '../../data/speakers';

const ScheduleRow = ({ agendaItem, activeTab }) => { // eslint-disable-line complexity
  if (!agendaItem) {
    return '';
  }

  const speaker = speakers.find(s => s.permalink === agendaItem.speakerRef);

  if (!speaker) { // TBA in agenda
    return (
      <div key={agendaItem.time} className="activity-row clearfix">
        <div className="activity-details">
          <span>{agendaItem.overrideTitle || 'TBA'}</span>
        </div>
        <div className="activity-location">
          <div className="room-and-time">
            <div>{ agendaItem.time }</div>
          </div>
        </div>
        <style jsx>{`
            .activity-row {
              padding: 20px 0;
              border-bottom: 1px solid rgba( 255, 255, 255, .7 );
              width: 100%;
              height: 100px;
              color: ${styles.mainColor3};
              font-weight: 400;
              text-align: center;
            }

            @media screen and (min-width: 1000px) {
              .activity-row {
                text-align: none;
              }
              .activity-details {
                width: 85%;
                height: 100%;
                float: right;
              }

              .activity-location {
                text-align: left;
                width: 15%;
                height: 100%;
              }

              .room-and-time {
                margin-top: 20px;
              }

              .activity-details span {
                margin-top: 20px;
                display: block;
              }
            }
          `}</style>
      </div>
    );
  }

  const isWorkshopTab = activeTab === 0;
  const activity = isWorkshopTab ? speaker.workshop : speaker.talk;
  const titleAs = isWorkshopTab ?
    `/workshops/${speaker.workshop.permalink}` :
    `/speakers/${speaker.permalink}`;
  const titleLink = isWorkshopTab ?
    `/workshops?name=${speaker.workshop.permalink}` :
    `/speakers?name=${speaker.permalink}`;

  return (
    <div key={activity.title}className="activity-row clearfix">
      <div className="activity-details">
        <div className="activity-title">
          <Link href={titleLink} as={titleAs}>
            <a>{ activity.title }</a>
          </Link>
        </div>
        <div>
          <Link href={`/speakers?name=${speaker.permalink}`} as={`/speakers/${speaker.permalink}`}>
            <a className="speaker-name" >{speaker.fullName}</a>
          </Link>
          <span className="speaker-position">, { speaker.position }</span>
          { speaker.company && (<span className="speaker-company">{ speaker.company }</span>) }
        </div>
      </div>
      <div className="activity-location">
        <div className="room-and-time">
          <div>{ agendaItem.time }</div>
          <div>{ agendaItem.room && agendaItem.room }</div>
        </div>
        <div className="speaker-image">
          <img
            src={`static/img/speakers/${speaker.img}`}
            alt={speaker.fullName}
          />
        </div>
      </div>
      <style jsx>{`
        .activity-row {
          padding: 20px 0;
          border-bottom: 1px solid rgba( 255, 255, 255, .7 );
          width: 100%;
          color: ${styles.mainColor3};
          font-weight: 400;
          text-align: center;
        }

        .activity-title {
          font-weight: 700;
        }

        .activity-title a {
          color: ${styles.mainColor3}
        }

        .speaker-name {
          color: ${styles.mainColor6};
        }

        .speaker-company {
          display: block;
        }

        .speaker-company:before {
          content: "";
        }

        .speaker-position {
          display: none;
        }

        .speaker-image {
          display: none;
        }

        .content-section {
          margin-bottom: 20px;
          float: left;
          width: 100%;
        }

        .room-and-time {
          margin-top: 20px;
        }

        @media screen and (min-width: 1000px) {
          .activity-row {
            text-align: left;
          }

          .activity-location {
            width: 35%;
            float: left;
          }

          .activity-details {
            width: 65%;
            float: right;
          }

          .speaker-position {
            display: inline;
          }

          .speaker-company {
            display: inline;
          }

          .speaker-company:before {
            content: ", ";
          }

          .speaker-image {
            display: block;
            width: 45%;
            float: left;
          }

          .speaker-image img {
            width: 60px;
            height: 60px;
            border: 1px solid #CCC;
            filter: grayscale( 100% );
          }

          .room-and-time {
            width: 55%;
            float: left;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ScheduleRow;
