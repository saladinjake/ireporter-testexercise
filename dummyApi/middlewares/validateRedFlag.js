/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
const locationRegex = /^([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)$/;

export class InputValidator {
  /**
   * @description Validate red-flag input
   *
   * @constructor
   * @param {String} request
   * @param {Object} response
   *
   * @returns {Object} Object
   */
  constructor() {
    this.passing = true;
    this.errMessage;
  }

  /** @function testForCreatedBy
   *  @param {number}
   *
   * @returns {boolean}
   */

  testForCreatedBy(createdBy) {
    if (typeof createdBy !== 'number') {
      this.passing = false;
      this.errMessage = 'Type of createdBy must be a valid user number';
    }
  }
  /** @function testForType
   *  @param {string}
   *
   * @returns {boolean}
   */

  testForType(type) {
    // eslint-disable-next-line no-mixed-operators
    if (typeof type !== 'string' || !type.includes('red-flag') && !type.includes('intervention')) {
      this.passing = false;
      this.errMessage = 'Type of record can either be red-flag or intervention';
    }
  }

  /** @function testForLocation
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForLocation(location) {
    if (typeof location !== 'string' || !locationRegex.test(location)) {
      this.passing = false;
      this.errMessage = 'Input does not match a Lat Long coordinates';
    }
  }

  /** @function testForStatus
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForStatus(status) {
    if (typeof status !== 'string' || !status.includes('draft') && !status.includes('under investigation') && !status.includes('resolved') && !status.includes('rejected')) {
      this.passing = false;
      this.errMessage = 'Input does not match any of the recommended status';
    }
  }

  /** @function testForImages
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForImages(images) {
    for (let i = 0; i < images.length; i++) {
      if (typeof images[i] !== 'string' || !images[i].includes('.jpg') && !images[i].includes('.png') && !images[i].includes('.jpeg')) {
        this.passing = false;
        this.errMessage = 'Input is not an array or a valid image extension';
      }
    }
  }

  /** @function testForVideos
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForVideos(videos) {
    for (let i = 0; i < videos.length; i++) {
      if (typeof videos[i] !== 'string' || !videos[i].includes('.mp4') && !videos[i].includes('.ogg') && !videos[i].includes('.hdmi')) {
        this.passing = false;
        this.errMessage = 'Video input is not an array or a string';
      }
    }
  }

  /** @function testForComment
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForComment(comment) {
    if (typeof comment !== 'string' || comment.length > 100) {
      this.passing = false;
      this.errMessage = 'Comment must be characters not exceeding 300 words';
    }
  }

  /** @function resetValid
   *
   * @returns {boolean}
   */
  resetErrorFields() {
    this.passing = true;
    this.errMessage = '';
  }

  /** @function testForType
   *  @param {object}
   *
   * @returns {boolean}
   */
  testForEmptyStringInput(incidents) {
    let datas = Object.values(incidents);
    check = datas.every(data => data !== '');
    if (!check) {
      this.passing = false;
      this.errMessage = 'Input fields must not be empty';
    }
  }

  testRedFlag(incidents) {
    this.resetErrorFields();
    this.testForCreatedBy(incidents.createdBy);
    this.testForType(incidents.type);
    this.testForLocation(incidents.location);
    this.testForStatus(incidents.status);
    this.testForImages(incidents.images);
    this.testForVideos(incidents.videos);
    this.testForComment(incidents.comment);
    this.testForEmptyStringInput(incidents);
    const resultObject = {
      passing: this.passing,
      err: this.errMessage
    };
    return resultObject;
  }
}

export default InputValidator;