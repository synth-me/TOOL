#!/usr/bin/perl

use strict;
use warnings;
use LWP::Simple; 
use POSIX qw(strftime);
use Encode qw(encode);
use File::Spec ; 

sub read_content {
=comment
	a wrapper to read all the files 
=cut  

	my ($file_path) = @_;
	open(my $fh, '<:encoding(UTF-8)', $file_path) or die "Could not open file '$file_path': $!";
	local $/ = undef;
	my $content = <$fh>;
	close($fh);
	return $content;
}

sub local_generate_xml {

	my $folder = "src";

	# getting all the files from the source 
	print "Fetching all files ...\n";
 	opendir(my $dir, $folder) or die "Could not open directory '$folder': $!\n";
	my @files = grep { $_ ne '.' && $_ ne '..' } readdir($dir);
	closedir($dir);
	print "Fetched total of $#files file(s) \n";

	# getting all the names from the files 
	my @files_paths = map { File::Spec->catfile($folder, $_) } @files;

	# current datetime to modify the file inside 
	my $datetime = strftime("%d-%m-%y_%H-%M-%S", localtime);

	# map over all the file's content and name and then start building 
	# the scripts  
	print "Let's add files ... \n" ; 
	my $script_elements = join('\n', map {
		my $index = $_;
		print "Adding ... $files_paths[$index]\n" ; 
		my $content = read_content $files_paths[$index] ;
		'<Script Name="'.$files[$index].'" OnDocumentLoad="onLoad"><![CDATA[//BUILD DATETIME'.$datetime.'//'.$content.']]></Script>';
	} reverse 0..$#files_paths);

	print "Building main component ...\n";
	# build the bigger component with all scripts nodes 
	my $content = '<Component Name="ramen-bundle">'.$script_elements.'</Component>';

	print "Creating build folder ...\n";
	# check if there's a 'build' folder, if not then create it 
	-d "build" ? print "There's already a build folder, using it ...\n" : mkdir('build') ; 

	# the new file name 
	my $xml_file = "build/ramen-bundle.tgml";

	# write the file in the build folder 
	open my $fh, '>', $xml_file or die "Couldn't open file '$xml_file' for writing: $! \n";
	binmode($fh, ':encoding(UTF-8)');
	print $fh $content;
	close $fh;

	print "All done !\n";
	
}

sub main {
	local_generate_xml();
}
main(); 

# eof 
