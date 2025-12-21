import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:nammellaramysuru/Model/community_model.dart';
import 'package:nammellaramysuru/widgets/eventTopbar.dart';

void showEventDetailDialog(BuildContext ctx, Community event) {
  showGeneralDialog(
    context: ctx,
    barrierDismissible: true,
    barrierLabel: 'close',
    pageBuilder: (_, __, ___) => EventDetailDialog(community: event),
    transitionDuration: const Duration(milliseconds: 250),
    transitionBuilder:
        (_, anim, __, child) => ScaleTransition(scale: anim, child: child),
  );
}

class EventDetailDialog extends StatelessWidget {
  final Community community;
  const EventDetailDialog({super.key, required this.community});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    return Center(
      child: Material(
        borderRadius: BorderRadius.circular(24),
        color: const Color(0xFFD8E3DC),
        child: Container(
          width: size.width * .90,
          constraints: BoxConstraints(maxHeight: size.height * .85),
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Align(
                alignment: Alignment.topRight,
                child: IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
              Flexible(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      EventTopBar(),
                      const SizedBox(height: 20),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Wrap(
                          alignment: WrapAlignment.spaceEvenly, // left aligned
                          spacing: 10, // equal to categories gap
                          runSpacing: 10,
                          children: [
                            Container(
                              width: 120,
                              height: 120,
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: const Color(0xFF6C0A27),
                                  width: 5,
                                ),
                              ),
                              child: Image.asset(
                                'assets/images/6.png',
                                fit: BoxFit.contain,
                              ),
                            ),
                            Container(
                              width: 700,
                              height: 100,

                              child: Row(
                                children: [
                                  const SizedBox(width: 20),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        const SizedBox(height: 20),
                                        Text(
                                          community.name,
                                          style: const TextStyle(
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold,
                                            color: Color(0xFF007C7A),
                                          ),
                                        ),

                                        Row(
                                          children: [
                                            Text(
                                              "Date: ",
                                              style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Text("dd/mm     "),
                                            Text(
                                              "Time: ",
                                              style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Text("hh:mm      "),
                                            Text(
                                              "Cost: ",
                                              style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Text("Free"),
                                            SizedBox(width: 20),
                                          ],
                                        ),

                                        SizedBox(height: 6),
                                        Row(
                                          children: [
                                            Text(
                                              "Contact : ",
                                              style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Text("Name"),

                                            SizedBox(width: 6),

                                            Text(
                                              "Number : ",
                                              style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 400),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                RatingBarIndicator(
                                  rating: 4,
                                  itemSize: 20,
                                  itemBuilder:
                                      (_, __) => const Icon(
                                        Icons.star,
                                        color: Color(0xFF007C7A),
                                      ),
                                ),
                                const SizedBox(height: 6),
                                const Text(
                                  "10k Reviews",
                                  style: TextStyle(
                                    color: Color(0xFF0C6168),
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Color(0xFF0C6168),
                                    padding: EdgeInsets.symmetric(
                                      horizontal: 20,
                                      vertical: 10,
                                    ),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                  ),
                                  onPressed: () {},
                                  child: const Text(
                                    "Register",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          textAlign: TextAlign.start,
                          'About the event',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF007C7A),
                          ),
                        ),
                      ),
                      const SizedBox(height: 6),
                      Flexible(
                        child: SingleChildScrollView(
                          child: Text(
                            'Swarapana is a music-focused community in Mysuru, featured under '
                            'the broader Nommellaramysuru initiative. It serves as a vibrant '
                            'platform for musicians, vocalists, and music lovers to come together, '
                            'share their passion, and participate in events and performances. '
                            'The group fosters traditional and contemporary music culture in the city '
                            'by organizing gatherings, jam sessions, and showcases that build a '
                            'deeper appreciation for the art form.',
                            style: TextStyle(
                              color: Color(0xFF007C7A),
                              height: 1.4,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          textAlign: TextAlign.start,
                          'Event Gallery',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF007C7A),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Wrap(
                          alignment: WrapAlignment.spaceEvenly, // left aligned
                          spacing: 20, // equal to categories gap
                          runSpacing: 20,
                          children: [
                            Container(
                              width: 400,
                              height: 400,
                              color: Colors.white,
                              alignment: Alignment.center,
                              child: Text(
                                'About the event',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 24,
                                ),
                              ),
                            ),

                            Container(
                              width: 900,
                              height: 400,
                              color: Colors.white,
                              alignment: Alignment.center,
                              child: Text(
                                'About the event',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 24,
                                ),
                              ),
                            ),
                            Container(
                              width: 900,
                              height: 400,
                              color: Colors.white,
                              alignment: Alignment.center,
                              child: Text(
                                'About the event',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 24,
                                ),
                              ),
                            ),

                            Container(
                              width: 400,
                              height: 400,
                              color: Colors.white,
                              alignment: Alignment.center,
                              child: Text(
                                'About the event',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 24,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      // header, rating, about, gallery, register ...
                      // (same content you already had)
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
