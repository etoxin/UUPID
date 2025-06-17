# **UUPID: Universally Unique Pronounceable Identifier**

## **Human-Friendly Identifiers That Just Work**

**UUPID (Universally Unique Pronounceable Identifier)** is a new standard for creating unique identifiers that are easy for humans to read, say, and remember, all while being cryptographically robust. Unlike traditional UUIDs that are tough for people to work with, UUPIDs are built for human interaction.

## **Terminology**

To ensure clarity and precision throughout this document, the following key terms are defined:

* **Universally Unique Identifier (UUID):** A 128-bit label used to uniquely identify objects in computer systems. The term **Globally Unique Identifier (GUID)** is often used synonymously, particularly in Microsoft systems.1  
* **Entropy:** In the context of random data, entropy refers to the measure of unpredictability or randomness. Higher entropy means a greater degree of unpredictability, which is crucial for collision resistance and security.3  
* **Pseudo-random Number Generator (PRNG):** An algorithm that generates a sequence of numbers that approximates the properties of random numbers. While useful for many applications, PRNGs are deterministic and can produce predictable sequences, especially if not properly seeded.4  
* **Cryptographically Secure Random Number Generator (CSPRNG):** A PRNG that is suitable for cryptographic applications. CSPRNGs are designed to produce numbers that are unpredictable and resistant to statistical analysis, making them essential for security-critical contexts.5

## **Why UUPID?**

Traditional UUIDs (like `a1b2c3d4-e5f6-7890-1234-567890abcdef`) are excellent for machines, offering unmatched uniqueness for distributed systems. But for humans, they're a headache:

* **Hard to Read:** A jumble of numbers and letters.  
* **Impossible to Remember:** They have no inherent meaning or structure.  
* **Prone to Errors:** It's easy to misread or mistype them, especially when communicated verbally (e.g., over the phone for customer support).

UUPID solves these problems by turning complex random data into a sequence of pronounceable, memorable segments. This makes identifiers genuinely user-friendly without compromising their crucial uniqueness or integrity.

## **Key Features**

* **Pronounceable Units:** UUPIDs are built from a carefully chosen dictionary of **2, 3, and 4-letter sound combinations** (e.g., Quan, Tron, Wise). We select these units because they flow naturally when put together.  
* **Case-Preserving Segments:** The **exact casing of each pronounceable unit, as it appears in the official UUPID dictionary**, is maintained in the final UUPID string (e.g., if the dictionary entry is "Test", it appears as "Test"; if "TEST", it appears as "TEST"). This allows for varied visual styles within the standard.  
* **Hyphenated Segments:** We join units with hyphens (e.g., Myri-Ador-Able). This segmentation makes the ID easier to read and parse.  
* **Robust Collision Resistance:** UUPIDs offer an exceptionally high level of uniqueness, with approximately **126 bits of random entropy**. By using a large, bias-free dictionary and a cryptographically secure random number generator (CSPRNG), the chance of accidental collision is incredibly low.

## **How It Works**

The UUPID standard precisely transforms high-entropy random data into its human-friendly string format:

1. **The Pronounceable Unit Dictionary:** At its heart is a **publicly specified dictionary** containing only 2, 3, and 4-letter pronounceable units. **This dictionary also defines the exact casing for each unit** (e.g., "aqua", "Aqua", or "AQUA" could be distinct entries). The dictionary's size (e.g., 8,192 to 16,384 entries) determines how much entropy each unit provides.  
2. **Entropy Generation:** A **cryptographically secure random number generator** creates approximately **126 bits of raw random entropy**. This forms the core random data of the identifier.  
3. **Bias-Free Unit Selection:** All random bits are precisely mapped to indices within the Pronounceable Unit Dictionary. A **bias-free algorithm** ensures every unit has an equal chance of being picked. Based on the dictionary's size, 9 to 10 units are chosen to complete the UUPID.  
4. **Formatting:** Each selected unit is used **exactly as it appears in the dictionary**, preserving its original casing. These units are then joined with **hyphens** (e.g., Aqua-Blit-Cron...) to form the final UUPID string.

This rigorous process ensures UUPIDs are not only unique and unpredictable but also intuitively readable, memorable, and robust against common human errors.

## **Size & Comparison to UUID v4**

By strictly using 2, 3, and 4-letter units, the average unit length will be close to **3 characters**.

* **Pronounceable Unit Dictionary Size:** We aim for N≥8,192 entries (13 bits/unit) or N≥16,384 entries (14 bits/unit).  
* **Units Needed:** 9 to 10 units are selected to embed the ≈126 random bits.

**Estimated UUPID Length:**

* For 10 units: (10 units×3 chars/unit)+(9 hyphens)=30+9=39 characters.  
* For 9 units: (9 units×3 chars/unit)+(8 hyphens)=27+8=35 characters.

A UUPID string will generally be **between 35 and 39 characters in length**.  
Comparison to UUID v4:  
UUID v4 is a 128-bit value, typically represented as a 36-character string in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.2 For UUID v4, specific bits are fixed to indicate the version and variant. The four most significant bits of the 7th byte are set to  
0100B (hex '4'), and the two most significant bits of the 9th byte are set to 10B (hex '8', '9', 'A', or 'B').4 Note that the bit-ordering conventions in RFC 4122 section 4.4 can be confusing.2

| Feature | UUID v4 (Standard) | UUPID (Universally Unique Pronounceable) |
| :---- | :---- | :---- |
| **Readability** | Poor (abstract hex) | **Excellent (pronounceable words)** |
| **Memorability** | None | **High** |
| **Pronounceable** | No | **Yes** |
| **Alphabet / Unit Set Size** | 16 (hexadecimal digits) | 8,192 \- 16,384 (pronounceable units) |
| **Entropy (Random)** | **122 bits** 8 | **\~126 bits** |
| **Version Bits** | 4 bits (fixed to '4') 4 | N/A (new standard) |
| **Variant Bits** | 2 bits (fixed to '8,9,A,B') 4 | N/A (new standard) |
| **Error Detection** | None built-in | None built-in |
| **Length** | 36 characters (with hyphens) 6 | **35 \- 39 characters** |
| **Format** | xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (where y is 8,9,A,B) 4 | Word-Word-Word-...-Word |
| **Collision Risk** | Practically Zero | **Practically Zero** |

UUPIDs offer a substantial leap in usability for humans with virtually no change in string length compared to a standard hyphenated UUID. It is important to note that the "Practically Zero" collision risk for both UUID v4 and UUPID is predicated on the use of a high-quality, unpredictable random source, ideally a Cryptographically Secure Random Number Generator (CSPRNG).5

## **Security Considerations for Identifiers**

While identifiers like UUPIDs and UUID v4 are designed for uniqueness, it's crucial to understand their limitations, especially concerning security:

* **UUID v4 and Secrets:** Despite being generated from random numbers, UUID v4s are generally **not suitable for use as secrets**, cryptographic keys, or in security-critical applications like session tokens or password reset links without additional, explicit cryptographic measures.5 The "randomness" in UUID v4 primarily serves to prevent collisions for identification purposes, not to provide cryptographic secrecy or unpredictability against an adversary.5  
* **Importance of CSPRNG:** For any identifier where unpredictability is critical—including UUPIDs and robust UUID v4 implementations—it is paramount to use a **Cryptographically Secure Random Number Generator (CSPRNG)**. Relying on low-quality or pseudo-random number generators (PRNGs) can severely undermine the uniqueness guarantee and increase the probability of collisions or predictability, especially in high-volume generation scenarios.4

## **Broader Context: Other Identifier Systems**

The landscape of unique identifiers extends beyond UUPIDs and UUID v4, with various types suited for different applications and requirements. Understanding these alternatives can help in selecting the most appropriate identifier for a given use case.

### **Other UUID Versions**

Beyond Version 4, the UUID standard defines several other versions, each with distinct generation methods and properties 1:

* **Version 1 (Date-time and MAC address):** Combines a timestamp with the MAC address of the generating computer. While useful for database keys due to their chronological order, Version 1 UUIDs can be tracked back to the machine that created them, posing privacy concerns.1  
* **Version 2 (DCE Security):** Similar to Version 1 but incorporates local domain numbers and integer identifiers, also carrying traceability risks.1  
* **Versions 3 and 5 (Namespace Name-based):** Generated by hashing a name within a specified namespace. These versions produce consistent UUIDs for the same input, making them useful for generating stable identifiers for named objects.1  
* **Version 6 (Reordered Timestamp):** A reordered version of Version 1, designed to offer better database index performance by placing the timestamp first.5  
* **Version 7 (Timestamp and Random):** Combines a Unix timestamp with random bits. This version offers chronological sortability while maintaining good randomness, making it suitable for modern applications requiring both order and unpredictability.1  
* **Version 8 (Custom):** Reserved for custom, implementation-specific UUID definitions, allowing for flexibility in specialized use cases.1

### **Alternative Identifier Types**

Different applications have diverse requirements that may not be met by standard UUIDs. Here are other common identifier types:

* **Human-Readable/Memorable Identifiers:** For user-facing applications where memorability and verbal communication are key, alternatives to abstract alphanumeric strings are valuable.  
  * **Proquints:** (PRO-nouncable QUINT-uplets) are identifiers composed of alternating unambiguous consonants and vowels, designed for readability, spellability, and memorability.10  
  * **Verbal-ID:** A JavaScript library that generates unique identifiers consisting of words that are pronounceable, distinguishable, and inclusive, often incorporating checksums for error handling.9  
* **Short Codes:** For applications requiring compact identifiers, such as URL shorteners or visual IDs where length is a constraint.  
  * **Sqids (formerly Hashids):** An open-source library that generates short, URL-safe unique identifiers from numbers, designed to be visually appealing and avoid common profanity words.11  
  * **ShortUniqueId:** Allows for configurable length and character sets, enabling the creation of shorter, custom identifiers with functions to calculate collision probabilities.12  
* **Sequential/Obfuscated Identifiers:** In scenarios where internal sequentiality is beneficial (e.g., for database indexing or audit trails) but external predictability is undesirable, a "mathematical trick" can be employed. This involves using an internally sequential numeric ID, multiplying it by a large prime (modulo a large power of the base), and then converting it to a base (e.g., base 36\) to make it appear random to the user while remaining reversible to the internal sequential ID.13  
* **Real-World Identifiers:** For linking to external systems or real-world entities, standardized "real-world identifiers" are crucial. These include registered company numbers, passport numbers, and tax IDs, often structured with schemes (e.g., http://org-id.guide for organizations, ISO 3-digit country codes for personal IDs).14

The following table provides a comparative overview of various unique identifier types, illustrating their diverse characteristics and optimal use cases:

| Identifier Type | Generation Method | Uniqueness Guarantee | Human-Readability/Memorability | Length/Format | Typical Use Cases | Key Considerations |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **UUID v1** | Timestamp \+ MAC address | Global (high confidence) | Poor | 36 char string | Distributed DB keys, systems needing creation time/origin | Traceability, privacy concerns (MAC address) 1 |
| **UUID v4** | Random bits (122 entropy) | Global (high probability) | Poor | 36 char string | General unique ID, distributed system identification | Not suitable for secrets, depends on RNG quality 5 |
| **UUID v7** | Timestamp \+ Random bits | Global (high probability) | Poor | 36 char string | Sorted DB keys, event logging, modern applications | Combines sortability with randomness 1 |
| **Proquint** | Pronounceable algorithm (CVCVC) | Fixed length, based on entropy | Excellent | 5-letter word quintuplets | User-facing IDs, debug codes, short passwords 10 | Limited entropy per word, pronouncability concerns |
| **Verbal-ID** | Word list filtering, phonetic codes | Fixed length, based on entropy | Excellent | Multi-word phrases | User-facing IDs, verbal communication, error tolerance 9 | Word list curation, potential for offensive combinations |
| **Sqids** | Number-to-string encoding (shuffled alphabet) | Within system (reversible) | Moderate | Short alphanumeric (variable) | URL shorteners, visual IDs for numbers, compact representation 11 | Reversible to original numbers, profanity filtering |
| **Sequential (Obfuscated)** | Sequential number \+ mathematical trick (mod prime, base conversion) | Within system (guaranteed) | Poor (appears random) | Alphanumeric (configurable) | Internal DB keys, audit trails (order important, not visible) 13 | Reversible mapping required, internal management |
| **Real-World Identifiers** | External registry/system | Within scheme (guaranteed) | Good (context-dependent) | Variable (e.g., Company Reg No, Passport) | External data linking, compliance, identity verification 14 | External dependency, privacy/security risks for publication |

## **Practical Implementation Considerations**

Implementing an identifier standard like UUPID involves more than just generation; it requires careful consideration of its integration into larger systems:

* **System Integration:** ID generation is often a component within a broader system architecture, such as microservices and APIs. A robust ID generation system typically includes components like an IDGenerator, RandomNumberGenerator, UUIDGenerator, and an IDLog for tracking generated IDs.3  
* **Storage and Indexing:** While UUPIDs are designed for human readability, their length (35-39 characters) and random nature should be considered for storage efficiency and database indexing. For high-volume systems, efficient storage (e.g., 16MB per day for 1 million 16-byte IDs) and indexing strategies are crucial.3  
* **High-Volume Generation:** For applications requiring the generation of a large number of identifiers, the underlying system must be planned and configured to match expected workloads and facilitate expansion.3

## **Future-Proofing and Scalability**

The UUPID standard is designed with future adaptability in mind, but it's important for implementers to stay aware of the evolving landscape of identifier technologies:

* **Evolving Standards:** The UUID standard itself is not static; newer versions like UUID v7 (timestamp and random) and UUID v8 (custom) are emerging and may offer advantages for specific use cases, particularly where chronological sortability or custom requirements are paramount.1 Implementers are encouraged to stay updated with the latest RFCs and industry best practices.  
* **Scalability:** While UUPIDs are designed for distributed generation, the sheer volume of IDs in large-scale systems necessitates robust infrastructure. Considerations for high-scale generation, distribution, and storage of identifiers should reference distributed system patterns and database indexing strategies optimized for such identifiers.3

## **UUPID Examples**

These examples use 2, 3, and 4-letter units, with their casing preserved as defined in the dictionary, and hyphenated.

1. `GOLD-En-Riva-Swif-Tide-Blom-Eria-Shor-Line-Vist` (39 characters)  
2. `CYBR-Quest-Logi-Grid-Fush-Code-Nexa-Prim-View-Poin` (39 characters)  
3. `AQUA-Flum-PLEX-STUN-rela-CREA-moRA-NOMI-COda-pure` (39 characters)  
4. `VENT-Ure-PATH-trek-FIND-more-AUra-ZONE-link-STAR` (39 characters)

## **Usage**

This repository currently contains the specification and design documents for the UUPID standard. The reference implementation for generating and validating UUPIDs is under development.  
Once complete, this section will provide detailed instructions and code examples for using the UUPID library in various programming languages.

JavaScript

```js
// Example of what the code might look like (Node.js)  
const uupid_lib = require('uupid');

// Generate a new UUPID  
const newUUPID = uupid_lib.generate();  
console.log(`Generated UUPID: ${newUUPID}`); // AQUA-Flum-PLEX-STUN-rela-CREA-moRA-NOMI-COda-pure
```

## **Installation**

The UUPID reference implementation libraries are currently under development. This section will be updated with installation instructions (e.g., npm, pip, composer commands) once the packages are published.

## **Contributing**

We welcome contributions to the UUPID standard and its reference implementations\! Please see the CONTRIBUTING.md file for details.

## **License**

This project is MIT licensed.

#### **Works cited**

1. Universally unique identifier \- Wikipedia, accessed on June 17, 2025, [https://en.wikipedia.org/wiki/Universally\_unique\_identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)  
2. Generate a UUID compliant with RFC 4122 \- CryptoSys.net, accessed on June 17, 2025, [https://www.cryptosys.net/pki/uuid-rfc4122.html](https://www.cryptosys.net/pki/uuid-rfc4122.html)  
3. Design a Random ID Generation System \- GeeksforGeeks, accessed on June 17, 2025, [https://www.geeksforgeeks.org/design-a-random-id-generation-system/](https://www.geeksforgeeks.org/design-a-random-id-generation-system/)  
4. IS.UUID.V4: UUID V4 Random Generation \- International Spectrum, accessed on June 17, 2025, [http://www.intl-spectrum.com/Article/r848/IS\_UUID\_V4\_UUID\_V4\_Random\_Generation](http://www.intl-spectrum.com/Article/r848/IS_UUID_V4_UUID_V4_Random_Generation)  
5. Not being snarky: what's the risk of using UUIDs for session tokens if they are \- Hacker News, accessed on June 17, 2025, [https://news.ycombinator.com/item?id=33703609](https://news.ycombinator.com/item?id=33703609)  
6. Online UUID Generator \- FusionAuth, accessed on June 17, 2025, [https://fusionauth.io/dev-tools/uuid-generator](https://fusionauth.io/dev-tools/uuid-generator)  
7. fusionauth.io, accessed on June 17, 2025, [https://fusionauth.io/dev-tools/uuid-generator\#:\~:text=The%20main%20advantage%20of%20version,another%202%20indicate%20the%20variant.](https://fusionauth.io/dev-tools/uuid-generator#:~:text=The%20main%20advantage%20of%20version,another%202%20indicate%20the%20variant.)  
8. Writing down (and searching through) every UUID \- eieio.games, accessed on June 17, 2025, [https://eieio.games/blog/writing-down-every-uuid/](https://eieio.games/blog/writing-down-every-uuid/)  
9. bandrews/verbal-id: JS library to generate unique identifiers consisting of words that are pronounceable, distinguishable and inclusive \- GitHub, accessed on June 17, 2025, [https://github.com/bandrews/verbal-id](https://github.com/bandrews/verbal-id)  
10. A Proposal for Proquints: Identifiers that are Readable, Spellable, and Pronounceable, accessed on June 17, 2025, [https://arxiv.org/html/0901.4016](https://arxiv.org/html/0901.4016)  
11. Sqids (formerly Hashids) · Generate Short Unique IDs, accessed on June 17, 2025, [https://sqids.org/](https://sqids.org/)  
12. short-unique-id \- v5.3.2, accessed on June 17, 2025, [https://shortunique.id/](https://shortunique.id/)  
13. Good algorithm for unique random generation of IDs \- Stack Overflow, accessed on June 17, 2025, [https://stackoverflow.com/questions/19203877/good-algorithm-for-unique-random-generation-of-ids](https://stackoverflow.com/questions/19203877/good-algorithm-for-unique-random-generation-of-ids)  
14. Real world identifiers \- Beneficial Ownership Data Standard, accessed on June 17, 2025, [http://standard.openownership.org/en/0.2.0/schema/guidance/identifiers.html](http://standard.openownership.org/en/0.2.0/schema/guidance/identifiers.html)
