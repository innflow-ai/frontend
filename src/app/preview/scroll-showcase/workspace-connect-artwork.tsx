import Image from "next/image";
import styles from "./workspace-connect-artwork.module.css";

const assets = "/preview/homepage/workspace-overview/optimized";
export function WorkspaceConnectArtwork() {
  return (
    <div className={styles.connect}>
      <div className={styles.pose}>
        <div className={styles.connections}>
          <div className={styles.salesforceConnection}>
            <Image
              alt=""
              className={styles.asset}
              src={`${assets}/38e89.svg`}
              width={72.7353}
              height={99.492}
              unoptimized
            />
          </div>
          <div className={styles.calendarConnection}>
            <Image
              alt=""
              className={styles.asset}
              src={`${assets}/d2028.svg`}
              width={103.516}
              height={49.7232}
              unoptimized
            />
          </div>
          <div className={styles.gmailConnection}>
            <Image
              alt=""
              className={styles.asset}
              src={`${assets}/ecd41.svg`}
              width={95.2515}
              height={49.0255}
              unoptimized
            />
          </div>
          <div className={styles.zoomConnection}>
            <Image
              alt=""
              className={styles.asset}
              src={`${assets}/9e6a1.svg`}
              width={81.3746}
              height={81.3746}
              unoptimized
            />
          </div>
          <div className={styles.notionConnection}>
            <Image
              alt=""
              className={styles.asset}
              src={`${assets}/8d7e1.svg`}
              width={63.0478}
              height={91.7865}
              unoptimized
            />
          </div>
          <div className={styles.notionTile}>
            <div className={styles.notionMark}>
              <Image
                alt=""
                className={styles.asset}
                src={`${assets}/14e35.svg`}
                width={27.828}
                height={29.1325}
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className={styles.salesforceTile}>
          <div className={styles.smallIconCanvas}>
            <div className={styles.salesforceMark}>
              <div className={styles.salesforceVector}>
                <Image
                  alt=""
                  className={styles.asset}
                  src={`${assets}/90992.svg`}
                  width={38.141}
                  height={26.6935}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.calendarTile}>
          <div className={styles.smallIconCanvas}>
            <div className={styles.calendarMark}>
              <div className={styles.calendarBinding}>
                <Image
                  alt=""
                  className={styles.asset}
                  src={`${assets}/7b0f0.svg`}
                  width={25.4261}
                  height={17.4804}
                  unoptimized
                />
              </div>
              <div className={styles.calendarPaper}>
                <Image
                  alt=""
                  className={styles.asset}
                  src={`${assets}/00bdf.svg`}
                  width={30.3363}
                  height={30.1935}
                  unoptimized
                />
              </div>
              <div className={styles.calendarMaskGroup}>
                <div
                  className={styles.calendarLowerMask}
                  style={{ maskImage: `url("${assets}/c174b.svg")` }}
                >
                  <Image
                    alt=""
                    className={styles.asset}
                    src={`${assets}/ab48f.svg`}
                    width={32.9745}
                    height={15.0968}
                    unoptimized
                  />
                </div>
              </div>
              <div className={styles.calendarMaskGroup}>
                <div
                  className={styles.calendarUpperMask}
                  style={{ maskImage: `url("${assets}/00848.svg")` }}
                >
                  <div className={styles.calendarBindingShadow}>
                    <Image
                      alt=""
                      className={styles.asset}
                      src={`${assets}/43320.svg`}
                      width={30.1935}
                      height={22.2478}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
              <div className={styles.calendarDate}>
                <Image
                  alt=""
                  className={styles.asset}
                  src={`${assets}/82f21.svg`}
                  width={16.6415}
                  height={15.0968}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gmailTile}>
          <div className={styles.gmailIconCanvas}>
            <div className={styles.gmailMark}>
              <Image
                alt=""
                className={styles.asset}
                src={`${assets}/5312c.svg`}
                width={37.8959}
                height={37.8959}
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className={styles.zoomTile}>
          <div className={styles.smallIconCanvas}>
            <div className={styles.zoomMark}>
              <Image
                alt=""
                className={styles.asset}
                src={`${assets}/a37db.svg`}
                width={38.1392}
                height={38.1392}
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className={styles.hubGlass}>
          <div className={styles.hubGlassShape}>
            <Image
              alt=""
              className={styles.asset}
              src={`${assets}/54aa0.svg`}
              width={100.263}
              height={105.518}
              unoptimized
            />
          </div>
        </div>
        <div className={styles.hubspotConnection}>
          <Image
            alt=""
            className={styles.asset}
            src={`${assets}/e052f.svg`}
            width={67.624}
            height={99.4363}
            unoptimized
          />
        </div>
        <div className={styles.hubspotTile}>
          <Image
            alt=""
            className={styles.asset}
            src={`${assets}/81e21.svg`}
            width={37.8959}
            height={37.8959}
            unoptimized
          />
        </div>
        <div className={styles.hubMark}>
          <div className={styles.hubMarkCanvas}>
            <div className={styles.hubMarkBase}>
              <Image
                alt=""
                className={styles.asset}
                src={`${assets}/1687c.svg`}
                width={82.1431}
                height={82.1431}
                unoptimized
              />
            </div>
            <div className={styles.hubLettering}>
              <Image
                alt=""
                className={styles.asset}
                src={`${assets}/b8564.svg`}
                width={58.4814}
                height={35.5788}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
