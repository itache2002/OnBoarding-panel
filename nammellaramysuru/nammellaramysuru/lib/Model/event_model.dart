class Event {
  final String name, description, date, time, cost;
  Event({
    required this.name,
    required this.description,
    required this.date,
    required this.time,
    required this.cost,
  });
}

class EventProvider {
  static List<Event> get events => [
    Event(
      name: "Swarapana",
      description: "Joyful singing session",
      date: "12/11",
      time: "06:00 PM",
      cost: "Free",
    ),
    Event(
      name: "Swarapana",
      description: "Joyful singing session",
      date: "12/11",
      time: "06:00 PM",
      cost: "Free",
    ),
    Event(
      name: "Swarapana",
      description: "Joyful singing session",
      date: "12/11",
      time: "06:00 PM",
      cost: "Free",
    ),
    Event(
      name: "Swarapana",
      description: "Joyful singing session",
      date: "12/11",
      time: "06:00 PM",
      cost: "Free",
    ),
  ];
}
