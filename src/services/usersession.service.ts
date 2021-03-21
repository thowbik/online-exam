import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { UserSession } from '../models/usersession';
import { StorageMap } from '@ngx-pwa/local-storage';
@Injectable()

export class UserSessionService {

  session = new UserSession();
  localStorageSessionKey: string;

  constructor(private storage: StorageMap) {
    this.localStorageSessionKey = 'DOF-' + environment.apiBaseUrl + '-AuthData';
  }

  create(session: any) {// jshint ignore:line
    this.setLocalStorageProperties(session);
  }

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties(new UserSession());
    this.storage.clear().subscribe(() => {});
  }
  clearSession() {
    localStorage.setItem("authToken",null);
  }

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  }

  authToken() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).authToken;
  }

  userId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).userId;
  }
  // schoolName(): string {
  //   debugger;
  //   const jsonData = localStorage.getItem(this.localStorageSessionKey);
  //   return jsonData == null ? '' : +JSON.parse(jsonData).schoolName;
  // }
  studentId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).studentId;
  }
  educationMediumId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).educationMediumId; 
  }
  studentName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).studentName; 
  }
  
  schoolName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).schoolName;
  }
  userName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).username;
  }
  userType() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).usertype;
  }
  schoolId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).schoolId;
  }
  userTypeId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).usertypeid;
  }
  gender() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).gender;
  }
  classStudingId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).classStudingId;
  }
  section() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).section;
  }
  groupId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).groupId;
  }
  setLocalStorageProperties(session: any) {// jshint ignore:line
    debugger;
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  }

  getLocalStorageWithKey(key: any) {// jshint ignore:line
    return localStorage.getItem(key);
  }

  setLocalStorageWithKey(key: any, session: any) {// jshint ignore:line
    localStorage.setItem(key, JSON.stringify(session));
  }
}

