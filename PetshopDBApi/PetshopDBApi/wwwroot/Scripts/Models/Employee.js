class Employee extends User {
    constructor(json)
    {
        super(json);
        if (json) {
            this.Area = json.area;
            this.JobTitle = json.jobTitle;
        }
        else
        {
            this.Area = "";
            this.JobTitle = "";
        }
    }
}