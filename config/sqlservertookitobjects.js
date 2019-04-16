class LocalUser {
    constructor() {
        this.userID = 0;
        this.firstName = '';
        this.surname = '';
        this.roleID = 0;
        this.userName = '';
        this.creationDatetime = Date.now;
        this.isLocked = false;
        this.password = '';
        this.teamID = 0;
        this.connectionStatus = false;
        this.isDisabled = false;
        this.loginCount = 0;
        this.lastAccessTime = Date.now;
        this.resetFlag = false;
        this.lastModifiedTime = Date.now;
        this.email = '';
        this.getObjectName = function() {
            return 'local_users';
        };
    }
}
class LdapUser {
    constructor() {
        this.userID = 0;
        this.firstName = '';
        this.surname = '';
        this.roleID = 0;
        this.userName = '';
        this.creationDatetime = Date.now;
        this.teamID = '';
        this.connectionStatus = '';
        this.loginCount = '';
        this.lastAccessTime = Date.now;
        this.email = '';
        this.getObjectName = function() {
            return 'ldap_users';
        };
    }
}

class Role {
    constructor() {
        this.roleID = 0;
        this.roleName = '';
        this.roleDescription = '';
        this.getObjectName = function() {
            return "roles";
        };
    }
}

class Team {
    constructor() {
        this.teamID = 0;
        this.teamName = '';
        this.teamDescription = '';
        this.getObjectName = function() {
            return "teams";
        };
    }
}



class MailTemplate {
    constructor() {
        templateID = 0;
        profileID = 0;
        alias = '';
        subject = '';
        body = '';
        attachments = '';
        embeddedImages = '';
        description = '';
        creationDatetime = Date.now;
        this.getObjectName = function() {
            return 'mail_templates';
        };
    }
}

class EmailHistory {
    constructor() {
        this.historyID = 0;
        this.status = 0;
        this.body = '';
        this.subject = '';
        this.attachments = '';
        this.embeddedImages = '';
        this.description = '';
        this.sender = '';
        this.receiverList = '';
        this.creationDatetime = Date.now;
        this.dateSent = Date.now;
        this.errorMessage = '';
        this.lastModifiedTime = Date.now;
        this.getObjectName = function() {
            return 'email_history';
        };
    }
}

class AuditTrailEntry {
    constructor() {
        this.trailID = 0;
        this.description = '';
        this.oldData = '';
        this.newData = '';
        this.affectedTable = '';
        this.changeTime = '';
        this.changeType = '';
        this.userName = '';
        this.userID = '';
        this.rowIdentifier = '';
        this.getObjectName = function() {
            return "audit_trail";
        };
    }
}


class DashboardOption {
    constructor() {
        this.optionID = 0;
        this.name = '';
        this.imageLocation = '';
        this.mainText = '';
        this.minorText = '';
        this.viewBttnTipText = '';
        this.newBttnTipText = '';
        this.getHtml = function() {
            return '<div class="col-md-4"><div class="card mb-4 shadow-sm"><img class="img-thumbnail" stye="width:97px; height:99px" src="./images/' + this.imageLocation + '" alt="' + this.name + ' image">' +
                '<div class="card-body"><p class="card-text">' + this.mainText + '</p> <div class="d-flex justify-content-between align-items-center">' +
                '<div class="btn-group">' +
                '<button type="button" class="btn btn-sm btn-outline-secondary" onclick="$.fn.viewItems(\'' + this.name + '\')" data-toggle="tooltip" data-placement="bottom" title="' + this.viewBttnTipText + '" >View</button>' +
                '<button type="button" class="btn btn-sm btn-outline-secondary" onclick="$.fn.addNewItem(\'' + this.name + '\')"  data-toggle="tooltip" data-placement="bottom" title="' + this.newBttnTipText + '">New</button>' +
                '</div>' +
                '<small class="text-muted">' + this.minorText + '</small>' +
                '</div></div></div></div>';
        };

    }

}

module.exports.LocalUser = LocalUser;
module.exports.LdapUser = LdapUser;
module.exports.Roles = Role;
module.exports.Teams = Team;
module.exports.MailTemplate = MailTemplate;
module.exports.EmailHistory = EmailHistory;
module.exports.DashboardOption = DashboardOption;