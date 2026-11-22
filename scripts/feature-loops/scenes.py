"""Artwork for the four homepage feature accordions, in 640-unit square coordinates."""

from contextlib import contextmanager

INK = "#202326"
MUTED = "#60666D"
LINE = "#E3E5E7"
SOFT = "#F2F3F4"
WHITE = "#FFFFFF"
GREEN = "#35715D"
MINT = "#E9F3ED"
BLUE = "#376985"
TINT = "#EBF2F6"
GOLD = "#946B26"
CREAM = "#FBF3E3"
DURATION = 10
# Each entry describes a concrete example of the action in its accordion.
SCENES = {
    3: (
        "Task brief",
        "Friday pipeline report",
        "Prepare a recap for the sales team.",
        "Brief saved",
    ),
    2: (
        "Tool access",
        "Sources for this report",
        "Quinn can use the tools you select.",
        "Permissions saved",
    ),
    1: (
        "Conversation",
        "Update the brief",
        "Friday pipeline report",
        "Instructions updated",
    ),
    4: (
        "Run activity",
        "Gather the weekly figures",
        "Friday pipeline report",
        "Sources checked",
    ),
    5: (
        "Review request",
        "Who should receive the recap?",
        "Quinn needs a decision before sending.",
        "Recipient confirmed",
    ),
    6: (
        "Draft review",
        "Friday pipeline recap",
        "Compare the draft with the source records.",
        "Revision requested",
    ),
    7: (
        "Flow editor",
        "New request intake",
        "Connect a trigger to its next actions.",
        "Route connected",
    ),
    8: (
        "Step owners",
        "Prepare the response",
        "An agent drafts. A teammate reviews.",
        "Owners assigned",
    ),
    9: (
        "Routing rule",
        "Check request priority",
        "Route this incoming request.",
        "Sent to on-call",
    ),
    10: (
        "Approval gate",
        "Release the response",
        "The flow waits for its reviewer.",
        "Flow resumed",
    ),
    11: (
        "Channel setup",
        "Launch coordination",
        "Give the project a shared home.",
        "Channel ready",
    ),
    12: (
        "# Launch",
        "Ask Quinn in the channel",
        "Everyone can follow the answer.",
        "Answer posted",
    ),
    13: (
        "# Launch",
        "Keep the follow-up in a thread",
        "Friday release checklist",
        "Reply added",
    ),
    14: (
        "Channel search",
        "Find the release decision",
        "Search messages and their supporting files.",
        "Decision found",
    ),
    15: (
        "Browser recording",
        "Record a weekly export",
        "Analytics / Reports",
        "Task recorded",
    ),
    16: ("Browser lookup", "Look up an order", "Orders / Search", "Record found"),
    17: (
        "Browser form",
        "Prepare a delivery update",
        "Orders / Edit shipment",
        "Ready for review",
    ),
    18: (
        "Export review",
        "Check the weekly report",
        "Downloads / Weekly report",
        "Export verified",
    ),
}


# Pointer positions follow the field or action being demonstrated (seconds, x, y).
POINTERS = {
    2: [(1.7, 410, 406), (2.4, 521, 286), (3.2, 521, 345), (4.1, 523, 402)],
    5: [(2.65, 362, 416), (3.65, 192, 357), (4.0, 190, 356)],
    6: [(1.8, 475, 289), (2.9, 455, 341), (3.7, 207, 409)],
    10: [(2.4, 480, 369), (3.7, 219, 344), (4.25, 219, 344)],
    14: [(1.55, 407, 402), (2.0, 295, 283), (3.1, 236, 348), (4.15, 273, 414)],
    15: [(1.55, 482, 392), (2.12, 402, 284), (3.05, 367, 339), (4.15, 173, 403)],
    16: [(1.55, 486, 405), (2.05, 268, 279), (3.05, 366, 347), (4.05, 368, 403)],
    17: [(1.65, 492, 421), (2.05, 386, 284), (3.05, 411, 353), (4.05, 288, 424)],
    18: [(1.55, 500, 423), (2.05, 310, 294), (3.05, 313, 373), (4.15, 256, 426)],
}
POINTER_SHAPE = [(0, 0), (2, 24), (8, 17), (13, 26), (18, 23), (13, 15), (23, 14)]


class Scene:
    def __init__(self, number):
        self.number = number
        self.layers = []
        self.start = 0
        self.group = "Shell"

    @contextmanager
    def moment(self, name, start):
        previous = self.group, self.start
        self.group, self.start = name, start
        yield
        self.group, self.start = previous

    def add(self, kind, **properties):
        self.layers.append(
            dict(kind=kind, group=self.group, start=self.start, **properties)
        )

    def rect(self, x, y, w, h, color, r=0, **motion):
        self.add("rect", x=x, y=y, w=w, h=h, color=color, r=r, **motion)

    def text(self, x, top, value, size=19, color=INK, bold=False):
        self.add("text", x=x, y=top, value=value, size=size, color=color, bold=bold)

    def dot(self, x, y, color, radius=5):
        self.rect(x - radius, y - radius, radius * 2, radius * 2, color, radius)

    def panel(self, x, y, w, h, radius=16):
        self.rect(x, y+2, w, h, LINE, radius)
        self.rect(x+1, y, w-2, h, WHITE, radius)


# The portrait launch uses several UI components. Each accordion adapts the
# one that performs its action, with the homepage's existing neutral colors.
COMPOSERS = {
    3: ("Reporting agent", ["Prepare Friday’s pipeline recap.", "Use closed deals and last week’s format."], "Friday at 4 PM"),
    1: ("Reporting agent", ["Update the brief.", "Include closed deals only."], "Correction added"),
    12: ("# Launch", ["@Quinn, summarize the launch brief.", "Who owns the rollout?"], "Launch brief.pdf"),
    15: ("Browser agent", ["Open the pipeline dashboard.", "Set the last 7 days and export a CSV."], "Weekly export"),
    16: ("Browser agent", ["Open Orders and find order 1042.", "Return the customer and shipping status."], "Orders / 1042"),
}

CONTEXT = {
    2: ("Report permissions", "CRM records", "Reports folder", "Report agent", "Checking access", "CRM records: read", "Reports folder: write", "Send email", "Off"),
    4: ("Run context", "Opportunities", "Weekly targets", "Reporting", "Checking sources", "Pipeline records checked", "Weekly targets matched", "Next step", "Draft recap"),
    7: ("Request intake", "Form received", "Request details", "Prepare", "Running flow", "Draft response prepared", "Response delivered", "Trigger", "New request"),
    8: ("Step ownership", "Draft response", "Review draft", "Handoff", "Assigning owners", "Draft assigned to Quinn", "Review assigned to Rachel", "Review owner", "Rachel Morgan"),
    9: ("Priority routing", "Urgent request", "Routine request", "Route", "Checking priority", "Priority: urgent", "Sent to on-call teammate", "Other route", "Regular queue"),
    11: ("Project context", "Launch brief", "Project team", "# launch", "Opening channel", "Rachel and Fred joined", "Launch brief pinned", "Agent", "Quinn"),
}

THREADS = {
    5: ("Approval needed", "Quinn has the Friday recap ready.", "Who should receive the report?", "Sales team or leadership?", "Send it to the sales team.", "Sales team"),
    10: ("Paused for review", "The draft is ready for Rachel.", "Approve this response?", "The next step will deliver it.", "Approved. Continue the flow.", "Deliver response"),
    13: ("Thread opened", "Fred shared the release checklist.", "Can we add the rollback steps?", "Rachel replied in the thread.", "Added them to the checklist.", "Release checklist"),
    14: ("Search results", "Query: launch approval", "Friday’s release is approved.", "Rachel in # launch", "Open the decision and supporting file.", "Release checklist"),
    17: ("Browser review", "Quinn prepared the delivery update.", "Order 1042 · Friday, June 12", "The form is ready for review.", "Hold here before submitting.", "Shipment form"),
}

CHECKS = {
    6: ("Draft evaluation", "Friday pipeline recap", "Compare the draft with CRM revenue", "Draft: $48,000", "Source: $46,000", "Return to Quinn for revision"),
    18: ("Export evaluation", "weekly-pipeline.csv", "Check exported columns and row count", "Columns: revenue, owner, close date", "Rows: 24 verified", "Report ready for review"),
}


def composer(s, data, outcome):
    agent, lines, attachment = data
    s.panel(34, 181, 572, 237, 26)
    s.rect(53, 199, 178, 32, SOFT, 16)
    s.dot(69, 215, BLUE, 5)
    s.text(82, 202, agent, 17)
    s.text(206, 203, "×", 16, MUTED)
    for i, line in enumerate(lines):
        y=251+i*33
        with s.moment("Input line "+str(i+1), .44+i*1.1):
            s.text(56,y,line,22)
            # A moving cover reveals the text at its natural width.
            s.rect(55,y,535,32,WHITE,wipe=(.72+i*1.1,1.85+i*1.1))
    s.text(58, 367, "@", 24, INK, True)
    with s.moment("Attached context",3.25):
        s.rect(98,365,243,32,SOFT,11)
        s.text(110,370,attachment,16,MUTED)
    s.dot(564,381,INK,21)
    s.rect(563,373,2,17,WHITE,1)
    s.rect(557,375,9,2,WHITE,1,angle=-.75)
    s.rect(563,375,9,2,WHITE,1,angle=.75)
    with s.moment("Submission receipt",4.75):
        s.panel(69,435,502,59,14)
        s.dot(93,464,GREEN,5);s.text(109,450,outcome,20,INK,True)


def context_stack(s,data,outcome):
    heading,a,b,node,status,first,second,side_label,side_value=data
    s.panel(69,85,502,219,18)
    s.text(91,102,heading,21,INK,True)
    s.rect(91,140,458,1,LINE)
    for i,label in enumerate((a,b)):
        y=163+i*59
        with s.moment("Context / "+label,.55+i*.45):
            s.text(96,y,label,18)
            s.rect(275,y+17,60,2,LINE,1,angle=.48 if i==0 else -.48)
    with s.moment("Route destination",1.48):
        s.rect(331,189,190,44,MINT,7)
        s.text(350,198,node,19,GREEN,True)
    with s.moment("Progress panel",2.05):
        s.panel(53,267,534,177,17)
        s.dot(83,301,BLUE,9);s.text(104,284,status+"…",24)
        s.text(75,324,"Following the work, step by step",16,MUTED)
        s.rect(74,352,489,1,LINE)
    for i,label in enumerate((first,second)):
        with s.moment(label,2.85+1.05*i):
            y=367+i*35
            s.dot(88,y+12,GREEN,4);s.text(106,y,label,18)
    for i,(label,value) in enumerate(((side_label,side_value),("Result",outcome))):
        with s.moment("Detail / "+label,4.55+i*.35):
            x=53+i*273
            s.panel(x,465,261,83,12);s.text(x+16,477,label,15,MUTED)
            s.text(x+16,504,value,17,INK,True)


def thread(s,data,outcome):
    status,lead,question,detail,reply,tag=data
    s.dot(72,158,MUTED,4);s.text(86,146,status,16,MUTED)
    s.text(65,185,lead,22)
    with s.moment("Request",.9):
        s.panel(64,231,477,91,12)
        s.text(82,247,question,20);s.text(82,281,detail,17,MUTED)
    with s.moment("Reply",2.7):
        s.panel(111,351,465,111,14)
        s.text(131,368,reply,20)
    with s.moment("Attached reference",3.8):
        s.rect(131,410,263,32,SOFT,8)
        s.dot(146,426,BLUE,4);s.text(158,414,tag,16)
    with s.moment("Resolved",5.0):
        s.dot(131,490,GREEN,4);s.text(146,478,outcome,17,MUTED)


def evaluation(s,data,outcome):
    heading,file,criterion,first,second,verdict=data
    s.panel(54,131,532,348,15)
    s.text(77,154,heading.upper(),19,INK,True)
    s.rect(77,194,486,1,LINE)
    s.text(77,212,file,19)
    s.text(77,251,criterion,17,MUTED)
    for i,label in enumerate((first,second)):
        with s.moment(label,1.65+i*1.1):
            y=307+i*49
            s.text(77,y,">",17,BLUE,True);s.text(100,y,label,18)
    with s.moment("Execution status",4.15):
        s.rect(76,415,488,39,SOFT,5)
        s.text(90,422,verdict,17,INK,True)
    with s.moment("Evaluation complete",5.1):
        s.dot(77,510,GREEN,4);s.text(94,498,outcome,18,GREEN)


def build(number):
    scene=Scene(number)
    outcome=SCENES[number][-1]
    for data,draw in [(COMPOSERS,composer),(CONTEXT,context_stack),(THREADS,thread),(CHECKS,evaluation)]:
        if number in data:
            draw(scene,data[number],outcome)
            return scene
    raise ValueError(f"Missing launch component for {number}")
